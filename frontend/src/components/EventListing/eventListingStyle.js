import styled from '@emotion/styled';
import theme from 'styles';

export const Listing = styled.div`
	> a {
		text-decoration: none;
		color: inherit;
		border-radius: 5px;
		overflow: hidden;
		display: block;
		background-color: #FFF;
		box-shadow: 0 2px 5px 0 rgba(0,0,0,.3);
		transition: transform .15s;

		&:hover {
			transform: translateY(-2px);

			& .name {
				text-decoration: underline;
			}
		}
	}
`;

export const Image = styled.img`
	width: 100%;
	object-fit: cover;
`;

export const Name = styled.span`
	display: block;
	font-weight: 500;
	font-size: 18px;
	margin: 8px 12px 0;
`;

export const Date = styled.span`
	display: inline-block;
	margin: 4px 12px;
	background-color: ${theme.primary};
	border-radius: 100px;
	padding: 4px 10px;
	color: #FFF;
`;

export const Description = styled.span`
	display: block;
	margin: 0 12px 12px;
`;
