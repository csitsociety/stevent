import React from 'react';
import { Link } from 'react-router-dom';

import { PillWrapper, Label, Image } from './pillStyle.js';

const Pill = ({ icon, label, href, ...rest }) => {
	return (
		<PillWrapper as={Link} to={href} {...rest}>
			{icon && (
				<Image src={icon} alt="" />
			)}
			<Label>{label}</Label>
		</PillWrapper>
	);
};

export default Pill;
