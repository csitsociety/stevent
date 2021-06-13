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

export const EventWrapper = styled.div`
  background-color: #fff;
  box-sizing: border-box;
  overflow: hidden;
  width: 600px;
  max-width: calc(100% - 20px);
  border-radius: 20px;
`

export const Image = styled.img`
  width: 100%;
  display: block;
`

export const EventInfo = styled.div`
  padding: 30px;

  & h1 {
    margin: 0 0 10px;
  }
  & h2 {
    margin: 10px 0 4px;
    font-size: 18px;
  }
`

export const Clubs = styled.div`
  margin-top: 16px;
`

export const Date = styled.span`
  display: block;
  color: ${theme.primary};
  font-weight: bold;
`

export const LoaderWrapper = styled.div`
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AttendeeList = styled.div`
  max-height: 150px;
  overflow-y: auto;
  margin: 4px 0;
`

export const User = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: bold;
  margin: 8px 0;

  &:hover {
    text-decoration: underline;
  }
`

export const UserName = styled.span`
  flex: 1;
  display: block;
  margin-left: 8px;
`

export const UserImage = styled.img`
  height: 32px;
  width: 32px;
  object-fit: cover;
  border-radius: 100px;
`

export const MapContainer = styled.div`
  width: 100%;
  border-radius: 5px;

  &[data-show='true'] {
    height: 200px;
  }
`
