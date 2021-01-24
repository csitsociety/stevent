import React, { useState, useEffect } from 'react';
import { DateTime } from "luxon";

import { EventColumnStyle } from './eventsStyle';
import {
	EventListing,
	EventFilter
} from 'components';

import event_img from 'res/test_event.png';
import { retrieveEventsFeed } from 'services';

const Events = () => {
	const [filter, setFilter] = useState('');
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const generateEventsFeed = async () =>
			setEvents((await retrieveEventsFeed({filter: filter})).matchingEvents);

		generateEventsFeed();
	}, [filter]);

	return (
		<>
			<EventFilter value={filter} onChange={e => setFilter(e.target.value)} />
			<EventColumnStyle>
				{events.map((event, i) =>
					<EventListing
						key={i}
						linkTo={`events/${event.id}`}
						name={event.title}
						image={event_img}
						date={DateTime.fromMillis(event.date).toFormat('t, DD')}
						description={event.description}
						hostingClubs={event.hostingClubs.join(", ")}
					/>
				)}
			</EventColumnStyle>
		</>
	)
}

export default Events;
