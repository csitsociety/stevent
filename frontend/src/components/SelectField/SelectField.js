import React from 'react'
import { useField } from 'formik'

import {
  InputContainer,
  StyledLabel,
  StyledSelect,
  InputError,
} from './selectFieldStyle.js'

const SelectField = ({ label, required, options, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <InputContainer>
      {label && (
        <StyledLabel required={required} htmlFor={field.name}>
          {label}
        </StyledLabel>
      )}
      <StyledSelect
        id={field.name}
        error={meta.touched && meta.error}
        {...field}
        {...props}
      >
        {Object.entries(options).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </StyledSelect>
      {meta.touched && meta.error && <InputError>{meta.error}</InputError>}
    </InputContainer>
  )
}

export default SelectField
