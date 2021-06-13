import React from 'react'
import { useField } from 'formik'

import {
  InputContainer,
  StyledLabel,
  StyledInput,
  InputError,
} from './textFieldStyle.js'

const TextField = ({ label, required, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <InputContainer>
      {label && (
        <StyledLabel required={required} htmlFor={field.name}>
          {label}
        </StyledLabel>
      )}
      <StyledInput
        id={field.name}
        type={props.type || 'text'}
        error={meta.touched && meta.error}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && <InputError>{meta.error}</InputError>}
    </InputContainer>
  )
}

export default TextField
