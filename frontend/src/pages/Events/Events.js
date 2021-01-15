import React from 'react';
import { Link } from 'react-router-dom';
import {EventColumnStyle} from './eventsStyle'

import {
	EventListing,
	EventFilter
} from 'components';

import { useAuthStore } from 'stores';

const Events = () => {
	const auth = useAuthStore();
	return (
		<div>
		<EventFilter/>
		<EventColumnStyle>

			<EventListing eventSrc="res/test_event.png"/>
			<EventListing eventSrc="res/test_event.png"/>
			<EventListing eventSrc="res/test_event.png"/>
			<EventListing eventSrc="res/test_event.png"/>
		</EventColumnStyle>
		</div>
	)
}

export default Events;
