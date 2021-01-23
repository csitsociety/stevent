import React, { useState, useEffect } from 'react';
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
			{filter !== '' && (
				<h4>Search results for: {filter}</h4>
			)}
			<EventColumnStyle>
				{events.map((event, i) => {
					console.log(JSON.stringify(event));
					return(
					<EventListing
						key={i}
						linkTo={`events/${event.id}`}
						name={event.name}
						image={event_img}
						date="4th Jan, 2021"
						description={event.description}
						hostingClubs={event.hostingClubs.join(", ")}
					/>)
				})}
			</EventColumnStyle>
		</>
	)
}

export default Events;
