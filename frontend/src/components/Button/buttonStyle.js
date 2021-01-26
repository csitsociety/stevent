import styled from '@emotion/styled';
import theme from 'styles';

export const StyledButton = styled.button`
	padding: 10px 30px;
	font: inherit;
	border: 0;
	background: ${theme.primary};
	color: #FFF;
	border-radius: 3px;
	cursor: pointer;
	position: relative;
	user-select: none;
	text-decoration: none;
	text-align: center;
	font-weight: 500;

	${props => props.disabled && `
		opacity: .5;
		cursor: default;
	`};

	&[data-secondary=true] {
		box-shadow: inset 0 0 0 2px ${theme.primary};
		background: transparent;
		color: ${theme.primary};
	}

	&[data-full-width=true] {
		width: 100%;
	}

	&.loading {
		cursor: default;
		color: transparent;
	}
`;

export const SpinnerWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;
