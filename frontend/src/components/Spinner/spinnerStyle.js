import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const spin = keyframes`
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
`

export const StyledDiv = styled.div`
  height: ${(props) => props.size - (props.size / 8) * 2}px;
  width: ${(props) => props.size - (props.size / 8) * 2}px;
  border-radius: 1000px;
  border: ${(props) => props.size / 8}px solid ${(props) => props.color};
  border-bottom: ${(props) => props.size / 8}px solid transparent;
  animation: ${spin} 0.8s linear infinite;
`
