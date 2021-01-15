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
	const varToString = varObj => Object.keys(varObj)[0]
	const onFilter = async (filters) => {
		setError(null);
		try {
			const events = await filterEvents({
				filters
			});

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
