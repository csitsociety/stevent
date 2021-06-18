import React, { useEffect } from 'react'
import fire from 'auth'
import { Redirect } from 'react-router-dom'
import { useCurrentProfile } from 'hooks'

const Logout = () => {
  const [profile, clearProfile] = useCurrentProfile()

  useEffect(() => {
    fire.auth().signOut()
    clearProfile()
  }, [profile, clearProfile])

  return <Redirect to={'/login'} />
}

export default Logout
