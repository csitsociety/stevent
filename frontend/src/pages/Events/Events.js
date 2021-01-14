import React from 'react';
import { Link } from 'react-router-dom';

import {
	Paragraph as P,
	Heading,
} from 'components';
import { useAuthStore } from 'stores';

const Events = () => {
	const auth = useAuthStore();

	return (
		<>
			<Heading>Events</Heading>
			<P>Welcome {auth.username}</P>
		</>
	);
};

export default Events;
