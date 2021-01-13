import styled from '@emotion/styled';

export const PageContainer = styled.div`
	background-color: #EEE;
	display: flex;
	width: 100%;
	min-height: 100vh;
	box-sizing: border-box;
	padding: 30px;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const FormWrapper = styled.div`
	background-color: #FFF;
	border-radius: 5px;
	max-width: 100%;
	width: 400px;
	padding: 30px;
`;

export const LogoWrapper = styled.div`
	text-align: center;

	> img {
		height: 100px;
		width: 100px;
	}
`;
