import React, { useState, useEffect } from 'react';
import config from '../../config'
import { ClubColumnStyle, LoaderWrapper } from './clubsStyle';
import {
	ClubListing,
	Spinner,
} from 'components';

import { retrieveClubs } from 'services';

const Clubs = () => {
	const [clubs, setClubs] = useState(undefined);
	useEffect(() => {
		const generateClubsList = async () =>
			setClubs((await retrieveClubs()).clubs);

		generateClubsList();
	}, []);

	return (
		<>
			<ClubColumnStyle>
				{clubs ? clubs.map((club, i) =>
					<ClubListing
						key={i}
						linkTo={`clubs/${club.id}`}
						name={club.name}
						image={config.imageStoreAccess + club.icon}
					/>
				) : (
					<LoaderWrapper>
						<Spinner size={36} />
					</LoaderWrapper>
				)}
			</ClubColumnStyle>
		</>
	)
}

export default Clubs;
