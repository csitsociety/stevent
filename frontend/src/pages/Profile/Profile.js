import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import {
	Paragraph as P,
	Heading,
	TextField,
	Button,
	Center,
	StatusMessage,
	Pill,
} from 'components';
import { useAuthStore } from 'stores';

import {
	PageContainer,
	PersonalDetails,
	ProfileContainer,
	ProfilePicture,
} from './profileStyle.js';

import img from 'res/test_club.png';

const Profile = () => {
	const history = useHistory();
	const auth = useAuthStore();

	return (
		<>
			<PageContainer>
				<PersonalDetails>
					<ProfilePicture src={img} alt="" />
					<Heading>{'Your name here'}</Heading>
					<P>Member since 14th January, 2021</P>

					<Heading size="h2">{'Clubs'}</Heading>
					<Pill icon={img} label="CSIT Society" href="#" />
					<Pill icon={img} label="The Programming Club" href="#" />
					<Pill icon={img} label="SWITCH" href="#" />
					<Pill icon={img} label="RISC" href="#" />
				</PersonalDetails>

				<ProfileContainer>
					<Heading size="h2">Recent event attendance</Heading>
					<P>No events attended, yet</P>

					<Heading size="h2">Badges recieved</Heading>
					<P>No badges</P>
				</ProfileContainer>
			</PageContainer>
		</>
	);
};

export default Profile;
