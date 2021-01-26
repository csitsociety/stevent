import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProfileStore } from 'stores';

import {
	Container,
	ClubWrapper,
	Image,
	LoaderWrapper,
	ClubHeader,
	Links,
} from './clubDetailsStyle';

import {
	Heading,
	Paragraph as P,
	Button,
	Spinner,
} from 'components';
import { retrieveClubDetails, updateClubSubscription } from 'services';
import config from 'config';

const ClubDetails = () => {
	const { id } = useParams();
	const [club, setClub] = useState(undefined);
	const [subscribed, setSubscribed] = useState(false);
	const profileStore = useProfileStore(state => state.profile);
	console.log("profile")
	console.log(profileStore)
	useEffect(() => {
		const fetch = async () => {
			if (id) {
				console.log(id)
				setClub((await retrieveClubDetails({clubID: id})).club);
				console.log(club)
				console.log("test")
				if (club.subscribed.includes(profileStore.rmitID)) {
					setSubscribed(true)
				}
			}
		};
		if (profileStore) {
			fetch()
		}
	}, [profileStore]);

	const updateSubscription = async (value) => {
		setSubscribed(value)
		console.log(club.clubID)
		console.log(profileStore.rmitID)
		console.log(value)
		await updateClubSubscription({
			clubID: club.clubID,
			rmitID: profileStore.rmitID,
			state: value
		})
	}

	return (
		<Container>
			<ClubWrapper>
				{club ? (
					<>
						<ClubHeader>
							<Image src={`${config.bucket}/${club.icon}`} alt={`Logo of ${club.name}`} title={id} />
							<Heading>{club.name}</Heading>
						</ClubHeader>

						<Links>
							<a href={club.discord} target="_blank">Discord</a>
							<a href={club.joinLink} target="_blank">Join club</a>
						</Links>
						<Button fullWidth secondary={!subscribed} onClick={updateSubscription(!subscribed)}>{subscribed ? 'Unsubscribe' : 'Subscribe'}</Button>

						<Heading size="h2">About</Heading>
						<P>{club.description}</P>
					</>
				) : (
					<LoaderWrapper>
						<Spinner size={36} />
					</LoaderWrapper>
				)}
			</ClubWrapper>
		</Container>
	)
}

export default ClubDetails;
