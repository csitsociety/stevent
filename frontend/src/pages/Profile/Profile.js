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
import fire from 'auth';

import {
	PageContainer,
	PersonalDetails,
	ProfileContainer,
	ProfilePicture,
	Events,
	LoaderWrapper,
	FormWrapper,
} from './profileStyle.js';

import event_img from 'res/test_event.png';
import { retrieveDSUser, retrieveClubs } from 'services';

const Profile = () => {
	const { id } = useParams();
	const [currentProfile, setCurrentProfile] = useState(undefined);
	const [clubs, setClubs] = useState(undefined);
	const [editProfile, setEditProfile] = useState(false);
	const profileStore = useProfileStore();

	useEffect(() => {
		const fetchUserDetails = async () => {
			if (id) {
				const user = (await retrieveDSUser({uid: id})).user;
				setCurrentProfile(user);
			} else {
				if (profileStore.profile) {
					setCurrentProfile(profileStore.profile);
				}
				// Update anyway
				const user = (await retrieveDSUser({uid: fire.auth().currentUser['uid']})).user;
				profileStore.setProfile(user);
				setCurrentProfile(user);
			}

			setClubs((await retrieveClubs()).clubs);
		}
		fetchUserDetails();
	}, [id]);

	return (
		<>
			<PageContainer>
				{editProfile ? (
					<FormWrapper>Edit profile</FormWrapper>
				) : (
					<>
						<PersonalDetails>
							{currentProfile && (
								<>
									<ProfilePicture src={currentProfile.icon} alt="" />
									<Heading>{currentProfile.username} {!id && '(you)'}</Heading>
									<P>{currentProfile.description}</P>
									{!id && (
										<Button onClick={() => setEditProfile(true)}>Edit profile</Button>
									)}

									<Heading size="h2">{'Clubs'}</Heading>
									{currentProfile.subscribed.length > 0 ? (
										clubs ? currentProfile.subscribed.map(clubID => {
											const club = clubs.find(c => c.id == clubID);
											return club && (
												<Pill
													key={clubID}
													icon={club.icon}
													label={clubID} href={`clubs/${clubID}`}
													title={club.name}
												/>
											);
										}) : (
											<div><Spinner size={16} /></div>
										)
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
									{false ? (
										<Events>
											<EventListing name="Test event" image={event_img} date="4th Jan, 2021" description="This is an example event used to demonstrate what an event listing looks like." linkTo="/events/1" />
											<EventListing name="Test event" image={event_img} date="4th Jan, 2021" description="This is an example event used to demonstrate what an event listing looks like." />
											<EventListing name="Test event" image={event_img} date="4th Jan, 2021" description="This is an example event used to demonstrate what an event listing looks like." />
										</Events>
									) : (
										<P>No events attended, yet</P>
									)}

									<Heading size="h2">Upcoming events registered</Heading>
									{false ? (
										<Events>
											<EventListing name="Test event" image={event_img} date="4th Jan, 2021" description="This is an example event used to demonstrate what an event listing looks like." linkTo="/events/1" />
											<EventListing name="Test event" image={event_img} date="4th Jan, 2021" description="This is an example event used to demonstrate what an event listing looks like." />
											<EventListing name="Test event" image={event_img} date="4th Jan, 2021" description="This is an example event used to demonstrate what an event listing looks like." />
										</Events>
									) : (
										<P>Not going to any upcoming events</P>
									)}
								</>
							) : (
								<LoaderWrapper>
									<Spinner size={36} />
								</LoaderWrapper>
							)}
						</ProfileContainer>
					</>
				)}
			</PageContainer>
		</>
	);
};

export default Profile;
