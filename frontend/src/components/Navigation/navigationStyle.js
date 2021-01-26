import styled from '@emotion/styled';
import theme from 'styles';

export const Container = styled.nav`
	position: sticky;
	display: flex;
	align-items: center;
	height: 60px;
	top: 0;
	left: 0;
	width: 100%;
	background-color: #FFF;
	border-bottom: 2px solid ${theme.primary};
	z-index: 200;

	& a {
		text-decoration: none;
	}
`;

export const StyledIcon = styled.div`
	margin-right: 10px;

	> a {
		padding: 8px 10px;
		background-color: #FFF;
		display: flex;
		align-items: center;
		border-radius: 100px;
		color: inherit;
		transition: box-shadow .2s, background-color .2s;
	}
	> a img {
		height: 24px;
		width: 24px;
		margin: 0 8px;
	}
	> a span {
		margin: 0 8px;
	}

	&:hover a {
		box-shadow: inset 0 0 0 2px ${theme.primary};
	}
	&.active a {
		background-color: ${theme.primary};
		color: #FFF;

		> img {
			filter: invert(1);
		}
	}
`;

export const StyledLogo = styled.img`
	text-align: center;
	height: 40px;
	width: 40px;
	padding: 12px;
`;

export const NavigationLogo = styled.div`
	display: flex;
	align-items: center;
`;

export const Title = styled.span`
	color: ${theme.primary};
	padding-right: 20px;
	font-weight: 600;
	font-size: 18px;
`;

export const Spacer = styled.div`
	flex: 1;
`;
