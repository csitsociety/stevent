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

		& form {
			text-align: left;
		}
	}
`;

export const ProfileContainer = styled.main`
	flex: 2;
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
	grid-gap: 20px;
	margin: 10px 0;
`;

export const LoaderWrapper = styled.div`
	padding: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const SmallLoaderWrapper = styled.div`
	padding: 10px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

export const ButtonArea = styled.div`
	> button {
		margin-right: 10px;
	}
`;

export const ProfilePictureEdit = styled.label`
	display: block;
	cursor: pointer;
	border-radius: 1000px;
	overflow: hidden;
	height: 200px;
	width: 200px;
	position: relative;

	> .uploadIcon {
		position: absolute;
		top: calc(50% - 18px);
		left: calc(50% - 18px);
		height: 36px;
		width: 36px;
		opacity: 0;
		z-index: 10;
		transition: opacity .15s;
	}
	&:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transition: opacity .15s;
		background-color: rgba(0,0,0,.5);
		opacity: 0;
	}

	&:hover {
		&:after, & .uploadIcon {
			opacity: 1;
		}
	}
`;

export const IconInput = styled.input`
	height: 0;
	width: 0;
	position: absolute;
	left: -1000px;
`;
