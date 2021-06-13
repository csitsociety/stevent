import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCurrentProfile } from 'hooks'

import {
  Container,
  StyledIcon,
  StyledLogo,
  Spacer,
  NavigationLogo,
  Title,
} from './navigationStyle.js'

import LogoTextless from 'res/logo_textless.svg'
import logoutIcon from 'res/log-out.svg'
import eventsIcon from 'res/calendar.svg'
import profileIcon from 'res/user.svg'
import clubsIcon from 'res/compass.svg'
import plusIcon from 'res/plus.svg'

const NavigationItem = ({ to, label, icon, hideLabel, ...rest }) => {
  const location = useLocation()
  return (
    <StyledIcon
      className={location.pathname === to ? 'active' : ''}
      title={label}
    >
      <Link to={to} {...rest}>
        {icon && <img src={icon} alt="" />}
        {!hideLabel && <span>{label}</span>}
      </Link>
    </StyledIcon>
  )
}

const Navigation = () => {
  const profile = useCurrentProfile()

  // Determine perms
  let isSuperAdmin = false
  let hasAdminClubs = false
  if (profile) {
    isSuperAdmin = profile.superadmin
    hasAdminClubs = (profile.adminClubs || []).length > 0
  }

  return (
    <Container>
      <Link to="/">
        <NavigationLogo>
          <StyledLogo src={LogoTextless} />
          <Title>Stevent</Title>
        </NavigationLogo>
      </Link>

      <Spacer />

      {isSuperAdmin && (
        <NavigationItem to="/clubs/new" label="Create Club" icon={plusIcon} />
      )}
      {hasAdminClubs && (
        <NavigationItem to="/events/new" label="Create Event" icon={plusIcon} />
      )}

      <NavigationItem to="/events" label="Events" icon={eventsIcon} />
      <NavigationItem to="/clubs" label="Clubs" icon={clubsIcon} />
      <NavigationItem to="/profile" label="My Profile" icon={profileIcon} />
      <NavigationItem to="/logout" label="Logout" icon={logoutIcon} hideLabel />
    </Container>
  )
}

export default Navigation
