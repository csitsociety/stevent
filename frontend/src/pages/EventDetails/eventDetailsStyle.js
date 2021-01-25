import styled from '@emotion/styled';
import theme from 'styles';

export const Container = styled.div`
	background-color: #EEE;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex: 1;
	box-sizing: border-box;
	padding: 20px 0;
`;

export const EventWrapper = styled.div`
	background-color: #FFF;
	box-sizing: border-box;
	overflow: hidden;
	width: 600px;
	max-width: calc(100% - 20px);
	border-radius: 20px;
`;

export const Image = styled.img`
	width: 100%;
	display: block;
`;

export const EventInfo = styled.div`
	padding: 30px;

	& h1 {
		margin: 0 0 10px;
	}
`;

export const Clubs = styled.div`
	margin-top: 16px;
`;

export const Date = styled.span`
	display: block;
	color: ${theme.primary};
	font-weight: bold;
`;

export const LoaderWrapper = styled.div`
	padding: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
