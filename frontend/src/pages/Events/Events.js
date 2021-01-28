import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { useProfileStore } from 'stores';
import config from '../../config'

import { EventColumnStyle, LoaderWrapper } from './eventsStyle';
import {
	EventListing,
	EventFilter,
	Spinner,
} from 'components';

import { retrieveEventsFeed } from 'services';

const truncate = input => input.length > 50 ? `${input.substring(0, 50)}...` : input;

const Events = () => {
	const [filter, setFilter] = useState('');
	const [events, setEvents] = useState(undefined);
	const profileStore = useProfileStore(state => state.profile);

	useEffect(() => {
		const generateEventsFeed = async () =>
			setEvents((await retrieveEventsFeed({filter: filter, lang: profileStore.lang})).matchingEvents);

		if (profileStore) {
			generateEventsFeed();
		}
	}, [filter, profileStore]);

	return (
		<>
			<EventFilter value={filter} onChange={e => setFilter(e.target.value)} />
			<EventColumnStyle>
				{events ? events.map((event, i) =>
					<EventListing
						key={i}
						linkTo={`events/${event.id}`}
						name={event.name}
						image={config.imageStoreAccess + event.image}
						date={DateTime.fromMillis(event.date).toFormat('t, DD')}
						description={truncate(event.description)}
						hostingClubs={event.hostingClubs.join(", ")}
					/>
				) : (
					<LoaderWrapper>
						<Spinner size={36} />
					</LoaderWrapper>
				)}
			</EventColumnStyle>
		</>
	)
}

export default Events;
