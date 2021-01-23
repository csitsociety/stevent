import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { EventColumnStyle } from './eventsStyle';

import {
	EventListing,
	EventFilter
} from 'components';

import event_img from 'res/test_event.png';

const EventDetails = () => {
	const { id } = useParams();

	return (
		<>
			Display event {id}
		</>
	)
}

export default EventDetails;
