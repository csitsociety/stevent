import styled from '@emotion/styled';
import theme from 'styles';

export const ToggleContainer = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`;

export const ToggleItem = styled.button`
	text-align: center;
	font: inherit;
	border: 0;
	padding: 8px 12px;
	flex: 1;
	cursor: pointer;
	white-space: nowrap;
	border-radius: 3px;
	margin: 4px;
	background: #E1E1E1;

	&.selected {
		background: ${theme.primary};
		color: #FFF;
	}
`;
