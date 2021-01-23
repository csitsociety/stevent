import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import {
	Paragraph as P,
	Heading,
	TextField,
	Button,
	Center,
	StatusMessage,
} from 'components';
import { useAuthStore } from 'stores';
import { signup } from 'services';

import { PageContainer, FormWrapper, LogoWrapper } from '../Login/loginStyle';

import logo from 'res/logo.svg';
import fire from 'auth';

const validationSchema = Yup.object({
	username: Yup
		.string()
		.ensure()
		.required('Student/staff number is required')
		.matches(/[s|S|e|E][0-9]./, 'Student/staff number must be a letter followed by numbers'),
	email: Yup
		.string()
		.ensure()
		.required('Email is required')
		.email('Email must be valid'),
	password: Yup
		.string()
		.ensure()
		.required('You need a password')
		.min(8, 'Password must be at least 8 characters long')
		.matches(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, 'Password must contain at least one letter and one number'),
	passwordAgain: Yup
		.string()
		.ensure()
		.required('You need to enter your password again')
		.oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const initialValues = {
	username: '',
	email: '',
	password: '',
	passwordAgain: '',
};

const Signup = () => {
	const history = useHistory();
	const [error, setError] = useState(null);

	useEffect(() => {
		if (fire.auth().currentUser) {
			history.push('/events');
		}
	}, fire.auth().currentUser);

	const onSubmit = async (values, setSubmitting, setErrors) => {
		setSubmitting(true);
		setError(null);
		try {
			const fireUserRecord = await fire.auth().createUserWithEmailAndPassword(values.email, values.password)
			const response = await signup({
				uid: fireUserRecord.user.uid,
				username: values.username,
				email: values.email,
				password: values.password,
			});
			if (response.success) {
				await fire.auth().signInWithEmailAndPassword(values.email, values.password)
			}
		} catch (error) {
			console.error(error);
			setError('An error occured, please try again');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<PageContainer>
			<FormWrapper>
				<LogoWrapper>
				 	<img src={logo} alt="Stevent Logo" />
				</LogoWrapper>
				<Heading>Sign up</Heading>
				{error && (
					<StatusMessage onClose={() => setError(null)}>{error}</StatusMessage>
				)}
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values, { setSubmitting, setErrors }) => {
						onSubmit(values, setSubmitting, setErrors);
					}}
				>
					{props => (
						<Form>
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

							<Center>
								<Button
									type="submit"
									disabled={!(props.isValid && props.dirty)}
									loading={props.isSubmitting}
								>Sign up</Button>
								<P>
									Already have an account? <Link to="/login">Login here!</Link>
								</P>
							</Center>
						</Form>
					)}
				</Formik>
			</FormWrapper>
		</PageContainer>
	);
};

export default Signup;
