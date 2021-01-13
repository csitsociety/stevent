import React, { useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
  RouteProps,
  useLocation,
  useHistory,
} from 'react-router-dom';

import Login from './Login/Login';

import { Navigation } from 'components';
import { useAuthStore } from 'stores';

export const PrivateRoute = props => {
	const { Component, ...rest } = props;
	const auth = useAuthStore();

	return (
		<Route
			{...rest}
			render={() =>
				auth.isAuthenticated ? (
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

				{/*<PrivateRoute path="/events" component={Events} exact />
				<PrivateRoute path="/profile" component={Profile} exact />
				<PrivateRoute path="/profile/:id" component={Profile} exact />*/}

				<Route path="/login" component={Login} exact />
			</Switch>
		</>
	);
};

export default Pages;
