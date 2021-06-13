import styled from '@emotion/styled'
import theme from 'styles'

export const Container = styled.div`
  background-color: #eee;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
  box-sizing: border-box;
  padding: 20px 0;
`

export const ClubWrapper = styled.div`
  background-color: #fff;
  box-sizing: border-box;
  overflow: hidden;
  width: 600px;
  max-width: calc(100% - 20px);
  border-radius: 20px;
  padding: 30px;

  & h2 {
    margin: 20px 0 4px;
    font-size: 18px;
  }
`

export const Image = styled.img`
  height: 100px;
  display: block;
  border-radius: 10px;
`

export const ClubHeader = styled.div`
  display: flex;
  align-items: center;

  & h1 {
    margin: 0 0 10px 20px;
    font-size: 26px;
    flex: 1;
  }
`

export const Links = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin: 20px 0 10px;

  a {
    display: block;
    text-align: center;
    padding: 6px;
  }
`

export const LoaderWrapper = styled.div`
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`
