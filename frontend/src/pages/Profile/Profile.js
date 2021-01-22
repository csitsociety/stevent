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
import fire from 'auth'
import { retrieveClubDetails } from 'services/clubs.js';

const Profile = () => {
	const { id } = useParams();
	const [userID, setUserID] = useState();
	const [userName, setUserName] = useState();
	const [userDescription, setDescription] = useState();
	const [userClubs, setUserClubs] = useState();
	const [userIcon, setUserIcon] = useState();
	//const [userRecentEvents, setUserRecentEvents] = useState();

	useEffect(() => {
		const fetchUserDetails = async () => {
			if (fire.auth().currentUser) {
				const user = (await retrieveDSUser({uid: fire.auth().currentUser['uid']})).user;
				setUserID(user.id)
				setUserName(user.username)
				setUserIcon(user.icon)
				setDescription(user.description)
				setUserClubs(user.memberClubs)
				// userRecentEvents(user.recentEvents)
			}
		}
		fetchUserDetails();
	}, [])

	const getClubImg = async (clubID) => {
		const href = await retrieveClubDetails(clubID)
		return href
	}

	return (
		<>
			<PageContainer>
				<PersonalDetails>
					<ProfilePicture src={"https://storage.googleapis.com/stevent-storage/default-user-icon.png"} alt="" />
					<Heading>{fire.auth().currentUser['uid'] ==  userID ? userName + " (You)" : userName}</Heading>
					<P>{userDescription}</P>

					<Heading size="h2">{'Clubs'}</Heading>
					{(() => {
						const clubDisplay = [];
						for (let i = 0; i < userClubs.length(); i++) {
							clubDisplay.push(<Pill icon={getClubImg(userClubs[i].logoURL)} label={userClubs[i].clubID} href="#" />)
						}
						return clubDisplay
					})
					}
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
