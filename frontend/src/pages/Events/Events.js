import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import { useCurrentProfile } from 'hooks'

import { EventColumnStyle, LoaderWrapper } from './eventsStyle'
import { EventListing, EventFilter, Spinner } from 'components'

import { retrieveEventsFeed } from 'services'

const truncate = (input) =>
  input.length > 50 ? `${input.substring(0, 50)}...` : input

const Events = () => {
  const [filter, setFilter] = useState('')
  const [subscribed, setSubscribed] = useState('all')
  const [events, setEvents] = useState(undefined)
  const [profile] = useCurrentProfile()

  useEffect(() => {
    const generateEventsFeed = async () =>
      setEvents((await retrieveEventsFeed({ filter: filter })).events)
    if (profile) {
      generateEventsFeed()
    }
  }, [filter, profile])

  return (
    <>
      <EventFilter
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        subscribed={subscribed}
        onSubscribedChange={(v) => setSubscribed(v)}
      />
      <EventColumnStyle>
        {events ? (
          events.map(
            (event, i) =>
              ((subscribed === 'upcoming' &&
                parseInt(event.date) > DateTime.local().toMillis()) ||
                (subscribed === 'subscribed' &&
                  event.hostingClubs.some((c) =>
                    profile.subscribed.includes(c)
                  )) ||
                subscribed === 'all') && (
                <EventListing
                  key={i}
                  linkTo={`events/${event.id}`}
                  name={event.name}
                  image={event.image}
                  date={DateTime.fromMillis(event.date).toFormat('t, DD')}
                  description={truncate(event.description)}
                  hostingClubs={event.hostingClubs.join(', ')}
                />
              )
          )
        ) : (
          <LoaderWrapper>
            <Spinner size={36} />
          </LoaderWrapper>
        )}
      </EventColumnStyle>
    </>
  )
}

export default Events
