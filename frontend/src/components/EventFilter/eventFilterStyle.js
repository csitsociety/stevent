import styled from '@emotion/styled';
import theme from 'styles';

export const Wrapper = styled.div`
	display: flex;
`;

export const QueryInput = styled.input`
	font: inherit;
	padding: 16px 24px;
	border: 0;
	width: 10px;
	flex: 1;
	font-size: 18px;
`;

export const Results = styled.span`
	display: block;
	font-size: 14px;
	font-weight: bold;
	padding: 6px 24px;
`;