import React, {useState} from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';

import Login from './Login/Login';
import Logout from './Logout/Logout';
import Signup from './Signup/Signup';
import Events from './Events/Events';
import EventDetails from './EventDetails/EventDetails';
import Profile from './Profile/Profile';
import fire from '../fire';
import { Navigation } from 'components';

export const PrivateRoute = props => {
	const { Component, ...rest } = props;
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	fire.auth().onAuthStateChanged((user) => {
		return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
	});

	return (
		<Route
			{...rest}
			render={() =>
				isLoggedIn ? (
					<Component {...props} />
				) : (
					<Redirect to={{
						pathname: '/login',
						state: { from: props.location },
					}} />
				)
			}
		/>
	);
};

const parseRouteName = (path: string) => path.split('/').filter((item: any) => item !== '')[0];

const Pages = () => {
	const location = useLocation();

	return (
		<>
			{parseRouteName(location.pathname) !== 'login' && (
				<Navigation />
			)}

			<Switch>
				<Redirect from="/" to="/login" exact />

				<PrivateRoute path="/events" component={Events} exact />
				<PrivateRoute path="/events/:id" component={EventDetails} exact />
				<PrivateRoute path="/profile" component={Profile} exact />
				<PrivateRoute path="/profile/:id" component={Profile} exact />

				<Route path="/login" component={Login} exact />
				<Route path="/signup" component={Signup} exact />
				<Route path="/logout" component={Logout} exact />
			</Switch>
		</>
	);
};

export default Pages;
