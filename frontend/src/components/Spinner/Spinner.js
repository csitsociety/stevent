import React from 'react'

import { StyledDiv } from './spinnerStyle.js'
import theme from 'styles'

const Spinner = ({ size, color, ...rest }) => {
  return (
    <StyledDiv
      size={size || '24'}
      color={color || theme.primary}
      className="spinner"
      {...rest}
    />
  )
}

export default Spinner
