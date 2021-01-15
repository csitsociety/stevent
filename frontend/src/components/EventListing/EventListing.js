import React from 'react';
import { Link } from 'react-router-dom';

import {
	Listing,
	Image,
	Name,
	Date,
	Description,
} from './eventListingStyle';

const EventListing = ({
	name,
	image,
	date,
	description,
	linkTo,
	...rest
}) => {
	return (
		<Listing {...rest}>
			<Link to={linkTo}>
				<Image src={image} alt="" />
				<Name className="name">{name}</Name>
				<Date>{date}</Date>
				<Description>{description}</Description>
			</Link>
		</Listing>
	)
};

export default EventListing;
