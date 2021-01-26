import React from 'react';

import { Wrapper, QueryInput, Results } from './eventFilterStyle.js';

export const EventFilter = ({
	value,
	onChange,
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
			</Wrapper>
			{value !== '' && (
				<Results>Search results for: "{value}"</Results>
			)}
		</>
	);
};

export default EventFilter;
