import React, { useState, useEffect } from 'react';

import { ClubColumnStyle, LoaderWrapper } from './clubsStyle';
import {
	ClubListing,
	Spinner,
} from 'components';

import event_img from 'res/test_event.png';
import { retrieveClubs } from 'services';

const Clubs = () => {
	const [clubs, setClubs] = useState(undefined);

	useEffect(() => {
        const generateClubsList = async () =>
            setClubs((await retrieveClubs()).clubs);
            generateClubsList();
	}, []);
	console.log(clubs)
	console.log("test")
	return (
		<>
			<ClubColumnStyle>
				{clubs ? clubs.map((club, i) =>
					<ClubListing
						key={i}
						linkTo={`clubs/${club.id}`}
						name={club.name}
						image={event_img}
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