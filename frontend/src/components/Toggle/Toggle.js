import React from 'react'

import { ToggleContainer, ToggleItem } from './toggleStyle.js'

const Toggle = ({ options, value, onChange, disabled = false, ...rest }) => {
  return (
    <ToggleContainer aria-disabled={disabled} {...rest}>
      {Object.entries(options).map(([key, option]) => (
        <ToggleItem
          key={key}
          disabled={disabled}
          className={value == key ? 'selected' : ''}
          onClick={() => onChange(key)}
        >
          {option}
        </ToggleItem>
      ))}
    </ToggleContainer>
  )
}

export default Toggle
