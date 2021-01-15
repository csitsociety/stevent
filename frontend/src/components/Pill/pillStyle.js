import styled from '@emotion/styled';

export const PillWrapper = styled.a`
	display: inline-flex;
	border: 1px solid #666;
	border-radius: 5px;
	padding: 4px 8px;
	text-decoration: none;
	color: inherit;
	margin-right: 8px;
	margin-bottom: 8px;
	align-items: center;
	min-height: 24px;
	vertical-align: middle;

	&:hover {
		text-decoration: underline;
	}
`;

export const Label = styled.span`
	font-size: 14px;
	font-weight: 600;
`;

export const Image = styled.img`
	height: 24px;
	width: 24px;
	border-radius: 3px;
	margin-right: 6px;
`;
