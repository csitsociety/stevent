import styled from '@emotion/styled'

export const EventColumnStyle = styled.div`
  background-color: #eee;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
  flex: 1;
  box-sizing: border-box;
  padding: 30px;
  position: relative;
`

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
