import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useProfileStore } from 'stores';
import config from 'config';

import {
	Container,
	EventWrapper,
	Image,
	EventInfo,
	Date,
	Clubs,
	LoaderWrapper,
} from './eventDetailsStyle';

import {
	Heading,
	Paragraph as P,
	Pill,
	Spinner,
	Toggle,
} from 'components';
import { getEventDetails, retrieveClubs } from 'services';

import event_img from 'res/test_event.png';

const EventDetails = () => {
	const { id } = useParams();
	const [event, setEvent] = useState(undefined);
	const [clubs, setClubs] = useState(undefined);
	const [going, setGoing] = useState(0);
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
			}
		};

		if (profileStore) {
			fetch();
		}
	}, [profileStore]);

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
											icon={`${config.bucket}/${club.icon}`}
											label={clubID} href={`/clubs/${clubID}`}
											title={club.name}
										/>
									);
								}) : (
									<P><Spinner size={16} /></P>
								)}
							</Clubs>

							<Heading size="h2">Are you going?</Heading>
							<Toggle
								options={{
									0: 'Not attending',
									1: 'I\'m going!'
								}}
								value={going}
								onChange={value => setGoing(value)}
							/>

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
