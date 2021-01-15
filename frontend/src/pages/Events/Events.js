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
	const onFilter = async (club = ) => {
		setError(null);
		try {
			const events = await filterEvents({
				filters: []],
				password: values.password,
			});

	return (
		<div>
		<EventFilter/>
		<EventColumnStyle>
			{for }
			<EventListing eventSrc="res/test_event.png"/>
			<EventListing eventSrc="res/test_event.png"/>
			<EventListing eventSrc="res/test_event.png"/>
			<EventListing eventSrc="res/test_event.png"/>
		</EventColumnStyle>
		</div>
	)
}

export default Events;
