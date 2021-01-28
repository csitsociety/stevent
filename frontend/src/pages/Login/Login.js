import React, { useState } from 'react';
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
	Spinner,
} from 'components';

import { PageContainer, FormWrapper, LogoWrapper } from './loginStyle';

import fire from 'auth';
import logo from 'res/logo.svg';

const validationSchema = Yup.object({
	email: Yup
		.string()
		.ensure()
		.required('Email is required'),
	password: Yup
		.string()
		.ensure()
		.required('Password is required'),
});

const initialValues = {
	email: '',
	password: '',
};

const Login = ({ location }) => {
	const history = useHistory();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	let from = undefined;
	if (location.state && location.state.from) {
		from = location.state.from.pathname;
	}
	fire.auth().onAuthStateChanged(user => user ? history.push(from || '/events') : setLoading(false));

	const onSubmit = async (values, setSubmitting, setErrors) => {
		setSubmitting(true);
		setError(null);
		try {
			await fire.auth().signInWithEmailAndPassword(values.email, values.password);
			history.push('/events');
		} catch (err) {
			setError('Incorrect email or password');
			console.error(err);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<PageContainer>
			{loading ? (
				<div><Spinner size={36} /></div>
			) : (
				<FormWrapper>
					<LogoWrapper>
					 	<img src={logo} alt="Stevent Logo" />
					</LogoWrapper>
					<Heading>Login</Heading>
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
									name="email"
									label="Email address"
									placeholder="s1234567@student.rmit.edu.au"
									required
								/>
								<TextField
									name="password"
									label="Password"
									type="password"
									required
								/>

								<Center>
									<Button
										type="submit"
										disabled={!(props.isValid && props.dirty)}
										loading={props.isSubmitting}
									>Login</Button>
									<P>
										Don't have an account? <Link to="/signup">Register here!</Link>
									</P>
								</Center>
							</Form>
						)}
					</Formik>
				</FormWrapper>
			)}
		</PageContainer>
	);
};

export default Login;
