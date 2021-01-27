import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useProfileStore } from 'stores';

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
} from './eventDetailsStyle';

import {
	Heading,
	Paragraph as P,
	Pill,
	Spinner,
	Toggle,
} from 'components';
import { getEventDetails, retrieveClubs, retrieveAttendees, updateAttendingEvent } from 'services';

import event_img from 'res/test_event.png';

const EventDetails = () => {
	const { id } = useParams();
	const [event, setEvent] = useState(undefined);
	const [clubs, setClubs] = useState(undefined);
	const [attendees, setAttendees] = useState(undefined);
	const [going, setGoing] = useState(undefined);
	const [goingLoading, setGoingLoading] = useState(true);
	const profileStore = useProfileStore(state => state.profile);

	useEffect(() => {
		const fetch = async () => {
			if (id) {
				const details = await getEventDetails({
					eventID: id,
					lang: profileStore.lang
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

	const updateAttending = async value => {
		setGoingLoading(true);
		const response = await updateAttendingEvent({
			eventID: id,
			userID: profileStore.id,
			state: value
		});

		if (response.success) {
			setGoing(response.state);

			setAttendees((await retrieveAttendees({ eventID: id })).attendingUsers);
		}
		setGoingLoading(false);
	};

	return (
		<Container>
			<EventWrapper>
				{event ? (
					<>
						<Image src={event_img} alt="" />

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

							<Heading size="h2">Attendees</Heading>
							<AttendeeList>
								{attendees ? (
									attendees.length > 0 ? attendees.map((user, i) =>
										<User as={Link} to={`/profile/${user.id}`} key={i}>
											<UserImage src={user.icon} alt="" />
											<UserName>{user.username}</UserName>
										</User>
									) : (
										<span>No one is going to this event yet</span>
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
