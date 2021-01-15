import React from 'react';
import { Link } from 'react-router-dom';
import { EventColumnStyle } from './eventsStyle';

import {
	EventListing,
	EventFilter
} from 'components';

import { useAuthStore } from 'stores';

import event_img from 'res/test_event.png';

const Events = () => {
	const auth = useAuthStore();
	return (
		<>
			<EventFilter/>
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
