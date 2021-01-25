import styled from '@emotion/styled';
import theme from 'styles';

export const LoaderWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ClubColumnStyle = styled.div`
	background-color: #EEE;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
	grid-gap: 20px;
	flex: 1;
	box-sizing: border-box;
	padding: 30px;
	position: relative;
`;
