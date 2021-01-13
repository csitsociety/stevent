import React from 'react';
import * as Yup from 'yup';

import { TextField } from 'components';

export const Validation = Yup.object({
	username: Yup.string().ensure().required('Student/staff number is required'),
	password: Yup.string().ensure().required('Password is required'),
});

export const initialValues = {
	username: '',
	password: '',
};

export const Form = props => (
	<>
		<TextField
			name="username"
			label="Student/staff number (with the letter)"
			placeholder="s1234567"
			required
		/>
		<TextField
			name="password"
			label="Password"
			type="password"
			required
		/>
	</>
);
