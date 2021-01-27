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
import { retrieveClubDetails, updateClubSubscription, retrieveDSUser } from 'services';
import config from 'config';

const ClubDetails = () => {
	const { id } = useParams();
	const [club, setClub] = useState(undefined);
	const [subscribed, setSubscribed] = useState(false);
	const [subscribedLoading, setSubscribedLoading] = useState(true);
	const profileStore = useProfileStore(state => state.profile);

	useEffect(() => {
		const fetch = async () => {
			if (id) {
				setClub((await retrieveClubDetails({clubID: id})).club);

				const user = (await retrieveDSUser({ uid: profileStore.id })).user;
				if (user.subscribed && user.subscribed.includes(id)) {
					setSubscribed(true);
				} else {
					setSubscribed(false);
				}
				setSubscribedLoading(false);
			}
		};

		if (profileStore) {
			fetch();
		}
	}, [profileStore]);

	const updateSubscription = async value => {
		setSubscribedLoading(true);

		const response = await updateClubSubscription({
			clubID: id,
			userID: profileStore.id,
			subscribe: value,
		});

		if (response.success) {
			setSubscribed(response.subscribed);
		}
		setSubscribedLoading(false);
	};

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
						<Button fullWidth secondary={!subscribed} loading={subscribedLoading} onClick={() => !subscribedLoading && updateSubscription(!subscribed)}>{subscribed ? 'Unsubscribe' : 'Subscribe'}</Button>

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
