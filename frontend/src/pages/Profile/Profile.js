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
import { useProfileStore } from 'stores';

import {
	PageContainer,
	PersonalDetails,
	ProfileContainer,
	ProfilePicture,
	Events,
} from './profileStyle.js';

import img from 'res/test_club.png';
import event_img from 'res/test_event.png';
import { retrieveDSUser, retrieveClubDetails } from 'services';
import fire from 'auth';

const Profile = () => {
	const { id } = useParams();
	const [currentProfile, setCurrentProfile] = useState(undefined);
	const profileStore = useProfileStore();

	useEffect(() => {
		const fetchUserDetails = async () => {
			if (id) {
				const user = (await retrieveDSUser({uid: id})).user;
				setCurrentProfile(user);
			} else if (fire.auth().currentUser && !profileStore.profile) {
				const user = (await retrieveDSUser({uid: fire.auth().currentUser['uid']})).user;
				setCurrentProfile(user);
				profileStore.setProfile(user);
			} else {
				setCurrentProfile(profileStore.profile);
			}
		}
		fetchUserDetails();
	}, []);

	const getClubImg = async clubID => await retrieveClubDetails(clubID);

	return (
		<>
			<PageContainer>
				<PersonalDetails>
					<ProfilePicture src={"https://storage.googleapis.com/stevent-storage/default-user-icon.png"} alt="" />
					<Heading>{currentProfile.username}{fire.auth().currentUser['uid'] == currentProfile.id && " (You)"}</Heading>
					<P>{currentProfile.description}</P>

					<Heading size="h2">{'Clubs'}</Heading>
					{currentProfile.memberClubs.map(club =>
						<Pill icon={getClubImg(club.logoURL)} label={club.clubID} href="#" />
					)}
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
