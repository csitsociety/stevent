import React from 'react';

import { Wrapper, QueryInput } from './eventFilterStyle.js';

export const EventFilter = ({
	query,
	onChange,
}) => {
	return (
		<Wrapper>
			<QueryInput
				type="search"
				name="query"
				placeholder="🔍 Search events or clubs..."
				value={query}
				onChange={onChange}
			/>
		</Wrapper>
	);
};

export default EventFilter;
