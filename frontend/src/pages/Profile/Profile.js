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
import config from 'config';

import {
	PageContainer,
	PersonalDetails,
	ProfileContainer,
	ProfilePicture,
	Events,
	LoaderWrapper,
} from './profileStyle.js';

import event_img from 'res/test_event.png';
import { retrieveDSUser, retrieveClubs } from 'services';

const Profile = () => {
	const { id } = useParams();
	const [currentProfile, setCurrentProfile] = useState(undefined);
	const [clubs, setClubs] = useState(undefined);
	const profileStore = useProfileStore(state => state.profile);

	useEffect(() => {
		const fetchUserDetails = async () => {
			if (id) {
				const user = (await retrieveDSUser({uid: id})).user;
				setCurrentProfile(user);
			} else {
				setCurrentProfile(profileStore);
			}

			setClubs((await retrieveClubs()).clubs);
		}
		fetchUserDetails();
	}, [id]);

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
							{currentProfile.subscribed.length > 0 ? (
								clubs ? currentProfile.subscribed.map(clubID => {
									const club = clubs.find(c => c.id == clubID);
									return club && (
										<Pill
											key={clubID}
											icon={`${config.bucket}/${club.icon}`}
											label={clubID} href={`clubs/${clubID}`}
											title={club.name}
										/>
									);
								}) : (
									<P><Spinner size={16} /></P>
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
