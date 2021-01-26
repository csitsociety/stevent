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

	${props => props.disabled && `
		opacity: .5;
		cursor: default;
	`};

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
