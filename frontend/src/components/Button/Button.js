import React from 'react';

import { StyledButton, SpinnerWrapper } from './buttonStyle.js';
import { Spinner } from 'components';

const Button = ({
	children,
	loading,
	...rest
}) => {
	return (
		<StyledButton
			loading={loading}
			{...rest}
		>
			{loading && (
				<SpinnerWrapper>
					<Spinner color='#FFF' />
				</SpinnerWrapper>
			)}
			{children}
		</StyledButton>
	);
};

export default Button;
