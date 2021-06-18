import React from 'react'

import { StyledParagraph } from './paragraphStyle.js'

const Paragraph = ({ children, ...rest }) => {
  return <StyledParagraph {...rest}>{children}</StyledParagraph>
}

export default Paragraph
