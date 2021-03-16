import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useProfileStore } from 'stores';
import { Loader } from '@googlemaps/js-api-loader';
import config from 'config';

import {
	Container,
	EventWrapper,
	Image,
	EventInfo,
	Date,
	Clubs,
	LoaderWrapper,
	AttendeeList,
	User,
	UserName,
	UserImage,
	MapContainer,
} from './eventDetailsStyle';

import {
	Heading,
	Paragraph as P,
	Pill,
	Spinner,
	Toggle,
} from 'components';
import { getEventDetails, retrieveClubs, retrieveAttendees, updateAttendingEvent } from 'services';

const EventDetails = () => {
	const { id } = useParams();
	const [event, setEvent] = useState(undefined);
	const [clubs, setClubs] = useState(undefined);
	const [attendees, setAttendees] = useState(undefined);
	const [going, setGoing] = useState(undefined);
	const [goingLoading, setGoingLoading] = useState(true);
	const profileStore = useProfileStore(state => state.profile);
	const mapRef = useRef();

	useEffect(() => {
		const fetch = async () => {
			if (id) {
				const details = await getEventDetails({
					eventID: id,
				});
				setEvent(details.event);

				setClubs((await retrieveClubs()).clubs);

				const eventAttendees = (await retrieveAttendees({ eventID: id })).attendingUsers;
				if (eventAttendees.find(u => u.id === profileStore.id)) {
					setGoing(1);
				} else {
					setGoing(0);
				}
				setGoingLoading(false);
				setAttendees(eventAttendees);
			}
		};

		if (profileStore) {
			fetch();
		}
	}, [profileStore]);

	useEffect(() => {
		const fetchMap = async () => {
			const loader = new Loader({
				apiKey: config.firebaseConfig.apiKey,
				version: 'weekly',
				libraries: ['places'],
			});
			await loader.load();
			new window.google.maps.Geocoder().geocode({
				address: event.location
			}, (results, status) => {
				if (status === window.google.maps.GeocoderStatus.OK) {
					mapRef.current.dataset.show = 'true';
					const position = {
						lat: results[0].geometry.location.lat(),
						lng: results[0].geometry.location.lng(),
					};
					const map = new window.google.maps.Map(mapRef.current, {
						zoom: 16,
						center: position,
						disableDefaultUI: true,
					});
					new window.google.maps.Marker({ position, map });
				} else {
					console.error('Couldn\'t geocode', status);
				}
			});
		};

		if (event && event.location && event.location !== '' && !event.location.startsWith('http')) {
			fetchMap();
		}
	}, [event]);

	const updateAttending = async value => {
		setGoingLoading(true);
		const response = await updateAttendingEvent({
			eventID: id,
			userID: profileStore.id,
			state: value
		});

		if (response.success) {
			setGoing(response.state);

			await new Promise(r => setTimeout(r, 1000));
			setAttendees((await retrieveAttendees({ eventID: id })).attendingUsers);
		}
		setGoingLoading(false);
	};

	return (
		<Container>
			<EventWrapper>
				{event ? (
					<>
						<Image src={event.image} alt="" />

						<EventInfo>
							<Heading>{event.name}</Heading>
							<Date>{DateTime.fromMillis(event.date).toFormat('t, DD')}</Date>
							<Clubs>
								{clubs ? event.hostingClubs.map(clubID => {
									const club = clubs.find(c => c.id == clubID);
									return club && (
										<Pill
											key={clubID}
											icon={club.icon}
											label={clubID} href={`/clubs/${clubID}`}
											title={club.name}
										/>
									);
								}) : (
									<div><Spinner size={16} /></div>
								)}
							</Clubs>

							{event.location && event.location !== '' && (
								<>
									<Heading size="h2">Location</Heading>
									{event.location.startsWith('http') ? (
										<P><a href={event.location} target="_blank">{event.location}</a></P>
									) : (
										<>
											<P>{event.location}</P>
											<MapContainer id="map" ref={mapRef}></MapContainer>
										</>
									)}
								</>
							)}

							{parseInt(event.date) < DateTime.local().toMillis() ? (
								<>
									<Heading size="h2">This event is over</Heading>
									<span>You {going ? 'went' : 'didn\'t go'} to this event</span>
								</>
							) : (
								<>
									<Heading size="h2">Are you going?</Heading>
									<Toggle
										options={{
											0: 'Not attending',
											1: 'I\'m going!'
										}}
										value={going}
										disabled={goingLoading}
										onChange={updateAttending}
									/>
								</>
							)}

							<Heading size="h2">Attendees</Heading>
							<AttendeeList>
								{attendees ? (
									attendees.length > 0 ? attendees.map((user, i) =>
										<User as={Link} to={`/profile/${user.id}`} key={i}>
											<UserImage src={user.icon} alt="" />
											<UserName>{user.username}</UserName>
										</User>
									) : (
										<span>No one {parseInt(event.date) < DateTime.local().toMillis() ? 'went to this event' : 'is going to this event yet'}</span>
									)
								) : (
									<LoaderWrapper>
										<Spinner size={36} />
									</LoaderWrapper>
								)}
							</AttendeeList>

							<Heading size="h2">Description</Heading>
							<P>{event.description}</P>
						</EventInfo>
					</>
				) : (
					<LoaderWrapper>
						<Spinner size={36} />
					</LoaderWrapper>
				)}
			</EventWrapper>
		</Container>
	)
}

export default EventDetails;
