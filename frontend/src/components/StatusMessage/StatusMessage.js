import React from 'react'

import theme from 'styles'

import { StyledMessage } from './statusMessageStyle.js'

import closeIcon from 'res/close.svg'

const StatusMessage = ({ children, onClose, color, ...rest }) => {
  return (
    <StyledMessage color={color || theme.error} {...rest}>
      {children}
      {onClose && (
        <button type="button" onClick={onClose} title="Close">
          <img src={closeIcon} alt="" />
        </button>
      )}
    </StyledMessage>
  )
}

export default StatusMessage
