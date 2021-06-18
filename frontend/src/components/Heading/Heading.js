import React from 'react'

import { StyledHeading } from './headingStyle.js'

const Heading = ({ children, size, ...rest }) => {
  return (
    <StyledHeading as={size || 'h1'} {...rest}>
      {children}
    </StyledHeading>
  )
}

export default Heading
