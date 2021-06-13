import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import {
  Container,
  ClubWrapper,
  Image,
  LoaderWrapper,
  ClubHeader,
  Links,
} from './clubDetailsStyle'

import { Heading, Paragraph as P, Button, Spinner } from 'components'
import { useCurrentProfile } from 'hooks'
import { retrieveClubDetails, updateClubSubscription } from 'services'

const ClubDetails = () => {
  const { id } = useParams()
  const [club, setClub] = useState(undefined)
  const [subscribed, setSubscribed] = useState(false)
  const [subscribedLoading, setSubscribedLoading] = useState(true)
  const [profile] = useCurrentProfile()

  useEffect(() => {
    const fetchClub = async () => {
      const { club } = await retrieveClubDetails({ clubID: id })
      setClub(club)
      setSubscribed(
        profile && profile.subscribed && profile.subscribed.includes(id)
      )
      setSubscribedLoading(false)
    }

    if (id && profile) {
      fetchClub()
    }
  }, [profile, id])

  const updateSubscription = async (value) => {
    setSubscribedLoading(true)

    const response = await updateClubSubscription({
      clubID: id,
      userID: profile.id,
      subscribe: value,
    })

    if (response.success) {
      setSubscribed(response.subscribed)
    }
    setSubscribedLoading(false)
  }

  return (
    <Container>
      <ClubWrapper>
        {club ? (
          <>
            <ClubHeader>
              <Image src={club.icon} alt={`Logo of ${club.name}`} title={id} />
              <Heading>{club.name}</Heading>
            </ClubHeader>

            <Links>
              <a href={club.discord} rel="noreferrer" target="_blank">
                Discord
              </a>
              <a href={club.joinLink} rel="noreferrer" target="_blank">
                Join club
              </a>
            </Links>
            <Button
              fullWidth
              secondary={!subscribed}
              loading={subscribedLoading}
              onClick={() =>
                !subscribedLoading && updateSubscription(!subscribed)
              }
            >
              {subscribed ? 'Unsubscribe' : 'Subscribe'}
            </Button>

            <Heading size="h2">About</Heading>
            <P>{club.description}</P>
          </>
        ) : (
          <LoaderWrapper>
            <Spinner size={36} />
          </LoaderWrapper>
        )}
      </ClubWrapper>
    </Container>
  )
}

export default ClubDetails
