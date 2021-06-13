import React from 'react'
import { ProfilePicture } from './ProfileIconStyle'
import gravatar from 'gravatar'

const defaultIcon =
  'https://storage.googleapis.com/stevent-backend-image-store-development/defaultAvatar.png'

const ProfileIcon = ({ profile }) => {
  const profileIcon =
    profile?.icon || gravatar.url(profile?.email, { default: defaultIcon })
  console.log(profileIcon)
  return <ProfilePicture src={profileIcon} alt="" />
}

export default ProfileIcon
