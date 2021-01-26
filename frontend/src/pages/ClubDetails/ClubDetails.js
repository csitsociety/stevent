import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

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
import { retrieveClubDetails } from 'services';
import config from 'config';

const ClubDetails = () => {
	const { id } = useParams();
	const [club, setClub] = useState(undefined);
	const [subscribed, setSubscribed] = useState(false);

	useEffect(() => {
		const fetch = async () => {
			if (id) {
				const details = await retrieveClubDetails({
					clubID: id
				});
				setClub(details.club);
			}
		};

		fetch();
	}, []);

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
						<Button fullWidth secondary={!subscribed} onClick={() => setSubscribed(!subscribed)}>{subscribed ? 'Unsubscribe' : 'Subscribe'}</Button>

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
