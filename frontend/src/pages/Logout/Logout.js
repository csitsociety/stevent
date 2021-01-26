import React, { useEffect } from 'react';
import { logout } from 'services';
import fire from 'auth';
import { Redirect } from 'react-router-dom'
import { useProfileStore } from 'stores';

const Logout = () => {
	const profileStore = useProfileStore();

	useEffect(() => {
		fire.auth().signOut();
		profileStore.clearProfile();
	}, []);

	return (
		<Redirect to={'/login'} />
	)
};

export default Logout;
