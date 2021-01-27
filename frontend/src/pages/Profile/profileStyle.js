import styled from '@emotion/styled';

const BP = '700px'

export const PageContainer = styled.div`
	display: flex;
	align-items: flex-start;
	margin: 30px;

	@media (max-width: ${BP}) {
		display: block;
	}
`;

export const PersonalDetails = styled.div`
	flex: 1;
	margin-bottom: 30px;

	> h1 {
		margin: 20px 0 10px;
	}
	> h2 {
		font-size: 18px;
		margin: 20px 0 8px;
	}

	@media (max-width: ${BP}) {
		text-align: center;
	}
`;

export const ProfileContainer = styled.main`
	flex: 2;
	border-left: 1px solid #CCC;
	box-sizing: border-box;
	padding: 20px;
	margin-bottom: 20px;

	> h2 {
		margin: 0;
	}
`;

export const ProfilePicture = styled.img`
	border-radius: 1000px;
	height: 200px;
	width: 200px;
	object-fit: cover;
	background-color: #EEE;
	border: 0;
`;

export const Events = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 0 20px;
	margin: 10px 0;
`;

export const LoaderWrapper = styled.div`
	padding: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const FormWrapper = styled.div`
	box-sizing: border-box;
	width: 600px;
	max-width: calc(100% - 20px);
	margin: 0 auto;
`;
