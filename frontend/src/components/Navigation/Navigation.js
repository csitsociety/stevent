import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Container, StyledLink } from './navigationStyle.js';

const NavigationItem = ({ to, label, ...rest }) => {
	const location = useLocation();

	return (
		<StyledLink isActive={location.pathname === to}>
			<Link to={to} {...rest}>{label}</Link>
		</StyledLink>
	);
};

const Navigation = () => {
	return (
		<Container>
			<StyledLink to="/events" label="Events" />
			<StyledLink to="/profile" label="My Profile" />
		</Container>
	);
};

export default Navigation;
