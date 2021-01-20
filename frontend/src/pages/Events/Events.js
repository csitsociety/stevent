import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EventColumnStyle } from './eventsStyle';

import {
	EventListing,
	EventFilter
} from 'components';

import { useAuthStore } from 'stores';

import event_img from 'res/test_event.png';
import fire from 'fire'

const Events = () => {
	const auth = useAuthStore();
	const [query, setQuery] = useState('');

	return (
		<>
			<EventFilter value={query} onChange={e => setQuery(e.target.value)} />
			{query !== '' && (
				<h4>Search results for: {query}</h4>
			)}
			<EventColumnStyle>
				<EventListing name="Test event" image={event_img} date="4th Jan, 2021" description="This is an example event used to demonstrate what an event listing looks like." />
				<EventListing name="Test event" image={event_img} date="4th Jan, 2021" description="This is an example event used to demonstrate what an event listing looks like." />
				<EventListing name="Test event" image={event_img} date="4th Jan, 2021" description="This is an example event used to demonstrate what an event listing looks like." />
				<EventListing name="Test event" image={event_img} date="4th Jan, 2021" description="This is an example event used to demonstrate what an event listing looks like." />
				<EventListing name="Test event" image={event_img} date="4th Jan, 2021" description="This is an example event used to demonstrate what an event listing looks like." />
				<EventListing name="Test event" image={event_img} date="4th Jan, 2021" description="This is an example event used to demonstrate what an event listing looks like." />
			</EventColumnStyle>
		</>
	)
}

export default Events;
