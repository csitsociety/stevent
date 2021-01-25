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
	Spinner,
} from 'components';
import { useProfileStore } from 'stores';

import {
	PageContainer,
	PersonalDetails,
	ProfileContainer,
	ProfilePicture,
	Events,
	LoaderWrapper,
} from './profileStyle.js';

import img from 'res/test_club.png';
import event_img from 'res/test_event.png';
import { retrieveDSUser, retrieveClubDetails } from 'services';

const Profile = () => {
	const { id } = useParams();
	const [currentProfile, setCurrentProfile] = useState(undefined);
	const profileStore = useProfileStore(state => state.profile);

	useEffect(() => {
		const fetchUserDetails = async () => {
			if (id) {
				const user = (await retrieveDSUser({uid: id})).user;
				setCurrentProfile(user);
			} else {
				setCurrentProfile(profileStore);
			}
		}
		fetchUserDetails();
	}, []);

	const getClub = async clubID => await retrieveClubDetails(clubID);

	return (
		<>
			<PageContainer>
				<PersonalDetails>
					{currentProfile && (
						<>
							<ProfilePicture src={"https://storage.googleapis.com/stevent-storage/default-user-icon.png"} alt="" />
							<Heading>{currentProfile.username}</Heading>
							<P>{currentProfile.description}</P>

							<Heading size="h2">{'Clubs'}</Heading>
							{currentProfile.memberClubs.length > 0 ? currentProfile.memberClubs.map(club =>
								<Pill icon={img} label={club} href={`clubs/${club}`} />
							) : (
								<P>Not a member of any clubs</P>
							)}
						</>
					)}
				</PersonalDetails>

				<ProfileContainer>
					{currentProfile ? (
						<>
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
						</>
					) : (
						<LoaderWrapper>
							<Spinner size={36} />
						</LoaderWrapper>
					)}
				</ProfileContainer>
			</PageContainer>
		</>
	);
};

export default Profile;
