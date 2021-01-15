import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
	Container,
	StyledIcon,
	StyledLogo,
	Spacer,
	NavigationLogo,
	Title,
} from './navigationStyle.js';

import logo_textless from 'res/logo_textless.svg';
import logout from 'res/log-out.svg';
import events from 'res/calendar.svg';
import profile from 'res/user.svg';

const NavigationItem = ({ to, label, icon, hideLabel, ...rest }) => {
	const location = useLocation();
	return (
		<StyledIcon className={location.pathname === to ? 'active' : ''} title={label}>
			<Link to={to} {...rest}>
				{icon && (
					<img src={icon} alt="" />
				)}
				{!hideLabel && (
					<span>{label}</span>
				)}
			</Link>
		</StyledIcon>
	);
};

const Navigation = () => {
	return (
		<Container>
			<Link to="/">
				<NavigationLogo>
					<StyledLogo src={logo_textless} />
					<Title>Stevent</Title>
				</NavigationLogo>
			</Link>

			<Spacer />

			<NavigationItem to="/events" label="Events" icon={events} />
			<NavigationItem to="/profile" label="My Profile" icon={profile} />
			<NavigationItem to="/logout" label="Logout" icon={logout} hideLabel />
		</Container>
	);
};

export default Navigation;
