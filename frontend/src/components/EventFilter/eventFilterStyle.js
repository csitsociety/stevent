import styled from '@emotion/styled'

export const Wrapper = styled.div`
  display: flex;

  @media (max-width: 700px) {
    flex-direction: column-reverse;
  }
`

export const QueryInput = styled.input`
  font: inherit;
  padding: 16px 24px;
  border: 0;
  width: 10px;
  flex: 1;
  font-size: 18px;

  @media (max-width: 700px) {
    width: 100%;
  }
`

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 4px;

  @media (max-width: 700px) {
    > * {
      width: 100%;
    }
  }
`

export const Results = styled.span`
  display: block;
  font-size: 14px;
  font-weight: bold;
  padding: 6px 24px;
`
