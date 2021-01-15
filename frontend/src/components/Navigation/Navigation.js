import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, StyledIcon, StyledLogo} from './navigationStyle.js';
import logo_textless from 'res/logo_textless.svg';
const NavigationItem = ({ to, label, icon = null, ...rest }) => {
	const location = useLocation();

	
	return (
		<StyledIcon>
			<Link to={to} {...rest}>
				<i class={icon}></i>
			</Link>
		</StyledIcon>
	);
};

const NavigationLogo = () => {
	return (
		<StyledLogo src={logo_textless} width="30" height="30"/>
	);
}

const Navigation = () => {
	return (
		<Container>
			<NavigationLogo/>
			<NavigationItem to="/logout" label="Logout" icon = "fa fa-sign-out"/>
			<NavigationItem to="/events" label="Events" icon="fa fa-calendar"/>
			<NavigationItem to="/profile" label="My Profile" icon="fa fa-user"/>
		</Container>
	);
};

export default Navigation;