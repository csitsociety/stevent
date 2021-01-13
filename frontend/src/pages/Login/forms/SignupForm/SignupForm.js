import React from 'react';
import * as Yup from 'yup';

import { TextField } from 'components';

export const Validation = Yup.object({
	username: Yup.string().ensure().required('Student/staff number is required'),
	email: Yup.string().ensure().required('Email is required'),
	password: Yup.string().ensure().required('You need a password'),
	passwordAgain: Yup.string().ensure().required('You need to enter your password twice'),
});

export const initialValues = {
	username: '',
	email: '',
	password: '',
	passwordAgain: '',
};

export const Form = props => (
	<>
		<TextField
			name="username"
			label="What is your student/staff number? (with the letter)"
			placeholder="s1234567"
			required
		/>
		<TextField
			name="email"
			type="email"
			label="Which email would you like to be contacted with?"
			placeholder="jenny@example.com"
			required
		/>
		<TextField
			name="password"
			label="Pick a secure password"
			type="password"
			required
		/>
		<TextField
			name="passwordAgain"
			label="Type the password again"
			type="password"
			required
		/>
	</>
);
