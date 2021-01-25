import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

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
import { getEventDetails } from 'services';

import event_img from 'res/test_event.png';
import club_img from 'res/test_club.png';

const EventDetails = () => {
	const { id } = useParams();
	const [event, setEvent] = useState(undefined);
	const [going, setGoing] = useState(0);

	useEffect(() => {
		const fetch = async () => {
			if (id) {
				const details = await getEventDetails({
					eventID: id
				});
				setEvent(details.event);
			}
		};
		fetch();
	}, []);

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
								{event.hostingClubs.map(club =>
									<Pill icon={club_img} label={club} href={`/clubs/${club}`} key={club} />
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
