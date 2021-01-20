import React, { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';

import {
	Paragraph as P,
	Heading,
	TextField,
	Button,
	Center,
	StatusMessage,
	Pill,
	EventListing,
} from 'components';
import { useAuthStore } from 'stores';

import {
	PageContainer,
	PersonalDetails,
	ProfileContainer,
	ProfilePicture,
	Events,
} from './profileStyle.js';

import img from 'res/test_club.png';
import event_img from 'res/test_event.png';
import { retrieveDSUser } from 'services/user.js';
import fire from 'fire'	

const Profile = () => {
	const { id } = useParams();
	const [user, setUser] = useState();

	useEffect(() => {
		const fetchUserDetails = async () => {
			console.log(fire.auth().currentUser['uid'])
			const response = await retrieveDSUser({uid: fire.auth().currentUser['uid']});
			console.log(response.user)
			setUser(response.user)
		}
		fetchUserDetails();
	}, [])


	return (
		<>
			<PageContainer>
				<PersonalDetails>
					<ProfilePicture src={"https://storage.googleapis.com/stevent-storage/default-user-icon.png"} alt="" />
					<Heading>{id ? id : 'You'}</Heading>
					<P>Member since 14th January, 2021</P>

					<Heading size="h2">{'Clubs'}</Heading>
					<Pill icon={img} label="CSIT Society" href="#" />
					<Pill icon={img} label="The Programming Club" href="#" />
					<Pill icon={img} label="SWITCH" href="#" />
					<Pill icon={img} label="RISC" href="#" />
				</PersonalDetails>

				<ProfileContainer>
					<Heading size="h2">Recent event attendance</Heading>
					{true ? (
						<Events>
							<EventListing name="Test event" image={event_img} date="4th Jan, 2021" description="This is an example event used to demonstrate what an event listing looks like." linkTo="/events/1" />
							<EventListing name="Test event" image={event_img} date="4th Jan, 2021" description="This is an example event used to demonstrate what an event listing looks like." />
							<EventListing name="Test event" image={event_img} date="4th Jan, 2021" description="This is an example event used to demonstrate what an event listing looks like." />
						</Events>
					) : (
						<P>No events attended, yet</P>
					)}

					<Heading size="h2">Badges recieved</Heading>
					<P>No badges</P>
				</ProfileContainer>
			</PageContainer>
		</>
	);
};

export default Profile;
