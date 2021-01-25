import React from 'react';

import { ToggleContainer, ToggleItem } from './toggleStyle.js';

const Toggle = ({
	options,
	value,
	onChange,
	...rest
}) => {
	return (
		<ToggleContainer {...rest}>
			{Object.entries(options).map(([key, option]) =>
				<ToggleItem
					key={key}
					className={value == key ? 'selected' : ''}
					onClick={() => onChange(key)}
				>{option}</ToggleItem>
			)}
		</ToggleContainer>
	);
};

export default Toggle;
