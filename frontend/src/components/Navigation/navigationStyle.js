import styled from '@emotion/styled';

export const Container = styled.nav`
	position: sticky;
	top: 0;
	left: 0;
	width: 100%;
	float: right;
	background-color: #FFFFFF;
`;

export const StyledIcon = styled.div`
	float: right;
	> a {
		float: right;
		padding: 12px;
	}
	> a i {
		color: #4000d0;
		font-size: 20px;
	}
`;

export const StyledLogo = styled.img`
	text-align: center;
	size: 20px;
	padding: 12px;
`;
