import React from 'react'

import {
  Wrapper,
  QueryInput,
  Results,
  ToggleContainer,
} from './eventFilterStyle.js'
import { Toggle } from 'components'

export const EventFilter = ({
  value,
  onChange,
  subscribed,
  onSubscribedChange,
}) => {
  return (
    <>
      <Wrapper>
        <QueryInput
          type="search"
          name="query"
          placeholder="🔍 Search events or clubs..."
          value={value}
          onChange={onChange}
        />
        <ToggleContainer>
          <Toggle
            options={{
              upcoming: 'Upcoming',
              subscribed: 'Subscribed only',
              all: 'All events',
            }}
            value={subscribed}
            onChange={onSubscribedChange}
          />
        </ToggleContainer>
      </Wrapper>
      {value !== '' && <Results>Search results for: "{value}"</Results>}
    </>
  )
}

export default EventFilter
