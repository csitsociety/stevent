import styled from '@emotion/styled'
import theme from 'styles'

export const Container = styled.nav`
  position: sticky;
  display: flex;
  align-items: center;
  height: 60px;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  border-bottom: 2px solid ${theme.primary};
  z-index: 200;

  & a {
    text-decoration: none;
  }
`

export const StyledIcon = styled.div`
  margin-right: 10px;

  > a {
    padding: 8px 10px;
    background-color: #fff;
    display: flex;
    align-items: center;
    border-radius: 100px;
    color: inherit;
    transition: box-shadow 0.2s, background-color 0.2s;
  }
  > a img {
    height: 24px;
    width: 24px;
    margin: 0 8px;

    @media (max-width: 700px) {
      margin: 0;
    }
  }

  > a span {
    margin: 0 8px;
  }

  &:hover a {
    box-shadow: inset 0 0 0 2px ${theme.primary};
  }

  &.active a {
    background-color: ${theme.primary};
    color: #fff;

    > img {
      filter: invert(1);
    }
  }

  @media (max-width: 700px) {
    margin-right: 2px;

    &:not(.active) > a span {
      display: none;
    }

    &[title='Logout'] {
      display: none;
    }

    &[title='My Profile'] {
      margin-right: 10px;
    }
  }
`

export const StyledLogo = styled.img`
  text-align: center;
  height: 40px;
  width: 40px;
  padding: 12px;
`

export const NavigationLogo = styled.div`
  display: flex;
  align-items: center;
`

export const Title = styled.span`
  color: ${theme.primary};
  padding-right: 20px;
  font-weight: 600;
  font-size: 18px;

  @media (max-width: 700px) {
    display: none;
  }
`

export const Spacer = styled.div`
  flex: 1;
`
