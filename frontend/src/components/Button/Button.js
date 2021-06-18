import React from 'react'

import { StyledButton, SpinnerWrapper } from './buttonStyle.js'
import { Spinner } from 'components'
import theme from 'styles'

const Button = ({
  children,
  loading,
  secondary = false,
  fullWidth = false,
  ...rest
}) => {
  return (
    <StyledButton
      className={loading ? 'loading' : ''}
      data-secondary={secondary}
      data-full-width={fullWidth}
      {...rest}
    >
      {loading && (
        <SpinnerWrapper>
          <Spinner color={secondary ? theme.primary : '#FFF'} />
        </SpinnerWrapper>
      )}
      {children}
    </StyledButton>
  )
}

export default Button
