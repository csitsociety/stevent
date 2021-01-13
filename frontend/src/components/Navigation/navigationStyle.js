import styled from '@emotion/styled';

export const Container = styled.nav`
	position: sticky;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 10;
	display: flex;
	align-items: center;
	background-color: #FFF;
`;

export const StyledLink = styled.div`
	> a {
		padding: 10px;
		font-weight: ${props => props.isActive ? 'bold' : 'normal'};
	}
`;
