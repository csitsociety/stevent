import styled from '@emotion/styled'
import theme from 'styles'

export const InputContainer = styled.div`
  padding-bottom: 16px;
`

export const StyledLabel = styled.label`
  display: block;
  font-size: 18px;
  margin-bottom: 2px;

  &::after {
    content: '${(props) => (!props.required ? ' (optional)' : '')}';
  }
`

export const StyledInput = styled.input`
  font: inherit;
  border: 1px solid ${(props) => (props.error ? theme.error : '#CCC')};
  border-radius: 3px;
  padding: 6px 8px;
  width: 100%;
  box-sizing: border-box;
  ${(props) => props.as == 'textarea' && 'resize: vertical;'}
`

export const InputError = styled.div`
  color: ${theme.error};
  font-size: 12px;
  font-weight: 500;
`
