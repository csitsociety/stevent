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

	@media (max-width: ${BP}) {
		text-align: center;
	}
`;

export const ProfileContainer = styled.main`
	flex: 2;
	border: 1px solid #666;
	box-sizing: border-box;
	padding: 20px;
	border-radius: 5px;
`;

export const ProfilePicture = styled.img`
	border-radius: 1000px;
	height: 200px;
	width: 200px;
	object-fit: cover;
	background-color: #EEE;
	border: 0;
`;
