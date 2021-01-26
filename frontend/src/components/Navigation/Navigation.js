import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProfileStore } from 'stores';
import fire from 'auth';
import { retrieveDSUser } from 'services';

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
import clubs from 'res/compass.svg';

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
	const profileStore = useProfileStore();

	useEffect(() => {
		const fetchUserDetails = async () => {
			const user = (await retrieveDSUser({uid: fire.auth().currentUser['uid']})).user;
			profileStore.setProfile(user);
		}

		if (fire.auth().currentUser && !profileStore.profile) {
			fetchUserDetails();
		}
	}, []);

	return (
		<Container>
			<Link to="/">
				<NavigationLogo>
					<StyledLogo src={logo_textless} />
					<Title>Stevent</Title>
				</NavigationLogo>
			</Link>

			<Spacer />

			{profileStore.profile && profileStore.profile.adminClubs && profileStore.profile.adminClubs.length > 0 && (
				<NavigationItem to="/events/new" label="Create Event" />
			)}

			<NavigationItem to="/events" label="Events" icon={events} />
			<NavigationItem to="/clubs" label="Clubs" icon={clubs} />
			<NavigationItem to="/profile" label="My Profile" icon={profile} />
			<NavigationItem to="/logout" label="Logout" icon={logout} hideLabel />
		</Container>
	);
};

export default Navigation;
