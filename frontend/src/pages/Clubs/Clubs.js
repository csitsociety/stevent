import React, { useState, useEffect } from 'react'

import { ClubColumnStyle, LoaderWrapper } from './clubsStyle'
import { ClubListing, Spinner } from 'components'

import { retrieveClubs } from 'services'

const Clubs = () => {
  const [clubs, setClubs] = useState(undefined)

  // Retrieve clubs from DS
  useEffect(() => {
    retrieveClubs().then(({ clubs }) => setClubs(clubs))
  }, [])

  // Show spinner when clubs not loaded
  if (!clubs) {
    return (
      <LoaderWrapper>
        <Spinner size={36} />
      </LoaderWrapper>
    )
  }

  return (
    <ClubColumnStyle>
      {clubs.map((club, i) => (
        <ClubListing
          key={`${club.name}-${club.id}`}
          linkTo={`clubs/${club.id}`}
          name={club.name}
          image={club.icon}
        />
      ))}
    </ClubColumnStyle>
  )
}

export default Clubs
