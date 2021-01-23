import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EventColumnStyle } from './eventsStyle';

import {
	EventListing,
	EventFilter
} from 'components';

import { useAuthStore } from 'stores';

import event_img from 'res/test_event.png';
import { retrieveEventsFeed } from 'services/events';

const Events = () => {
	const [filter, setFilter] = useState('');
	const [events, setEvents] = useState();

	const generateEventsFeed = async () => {
		const events = (await retrieveEventsFeed({filter: filter})).matchingEvents
		let eventListings = []
		for (let i = 0; i < events.length; i++) { 
			eventListings.push(<EventListing name={events[i].name} image={event_img} date="4th Jan, 2021" description={events[i].description} hostingClubs={events[i].hostingClubs.join(" x ")}/>)
		}
		setEvents(eventListings)
	}

	useEffect(generateEventsFeed, [filter])

	return (
		<>
			<EventFilter value={filter} onChange={e => setFilter(e.target.value)} />
			{filter !== '' && (
				<h4>Search results for: {filter}</h4>
			)}
			<EventColumnStyle>
				{events}
			</EventColumnStyle>
		</>
	)
}

export default Events;
