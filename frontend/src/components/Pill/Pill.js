import React from 'react';

import { PillWrapper, Label, Image } from './pillStyle.js';

const Pill = ({ icon, label, ...rest }) => {
	return (
		<PillWrapper {...rest}>
			{icon && (
				<Image src={icon} alt="" />
			)}
			<Label>{label}</Label>
		</PillWrapper>
	);
};

export default Pill;
