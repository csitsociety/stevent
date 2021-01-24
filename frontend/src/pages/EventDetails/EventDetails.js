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
} from 'components';
import { getEventDetails } from 'services';

import event_img from 'res/test_event.png';

const EventDetails = () => {
	const { id } = useParams();
	const [event, setEvent] = useState(undefined);

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
									<Pill label={club} href="#" />
								)}
							</Clubs>

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
