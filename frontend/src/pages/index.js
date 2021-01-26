import React, { useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';

import Login from './Login/Login';
import Logout from './Logout/Logout';
import Signup from './Signup/Signup';
import Events from './Events/Events';
import EventDetails from './EventDetails/EventDetails';
import CreateEvent from './CreateEvent/CreateEvent';
import Profile from './Profile/Profile';
import Clubs from './Clubs/Clubs';
import fire from 'auth';
import { Navigation } from 'components';

export const PrivateRoute = props => {
	const [isLoggedIn, setIsLoggedIn] = useState(!!fire.auth().currentUser);

	fire.auth().onAuthStateChanged(user => setIsLoggedIn(!!user));

	return isLoggedIn ? (
		<Route {...props} />
	) : (
		<Redirect to={{
			pathname: '/login',
			state: { from: props.location },
		}} />
	);
};

const parseRouteName = (path: string) => path.split('/').filter((item: any) => item !== '')[0];

const Pages = () => {
	const location = useLocation();
	const pagesWithoutNav = [
		'login',
		'signup',
		'logout',
	];

	return (
		<>
			{!pagesWithoutNav.includes(parseRouteName(location.pathname)) && (
				<Navigation />
			)}

			<Switch>
				<Redirect from="/" to="/login" exact />

				<PrivateRoute path="/events" component={Events} exact />
				<PrivateRoute path="/events/new" component={CreateEvent} exact />
				<PrivateRoute path="/events/:id" component={EventDetails} exact />
				<PrivateRoute path="/profile" component={Profile} exact />
				<PrivateRoute path="/profile/:id" component={Profile} exact />
				<PrivateRoute path="/clubs" component={Clubs} exact />

				<Route path="/login" component={Login} exact />
				<Route path="/signup" component={Signup} exact />
				<Route path="/logout" component={Logout} exact />
			</Switch>
		</>
	);
};

export default Pages;
