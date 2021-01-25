import styled from '@emotion/styled';
import theme from 'styles';

export const InputContainer = styled.div`
	padding-bottom: 16px;
`;

export const StyledLabel = styled.label`
	display: block;
	font-size: 18px;
	margin-bottom: 2px;

	&::after {
		content: '${props => !props.required ? ' (optional)' : ''}';
	}
`;

export const CheckboxWrapper = styled.div`
	padding: 4px 0;
`;

export const CheckboxLabel = styled.label`
	font: inherit;
	display: inline-block;
	padding-left: 4px;
	user-select: none;
`;

export const Checkbox = styled.input`
	font: inherit;
`;

export const InputError = styled.div`
	color: ${theme.error};
	font-size: 12px;
	font-weight: 500;
`;
