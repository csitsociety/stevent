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
} from 'components';

import { PageContainer, FormWrapper, LogoWrapper } from './loginStyle';

import fire from '../../fire.js';
import App from '../../App';
import logo from 'res/logo.svg';

const validationSchema = Yup.object({
	email: Yup
		.string()
		.ensure()
		.required('Student/staff email is required'),
	password: Yup
		.string()
		.ensure()
		.required('Password is required'),
});

const initialValues = {
	email: '',
	password: '',
};



const Login = () => {
	const history = useHistory();
	const [error, setError] = useState(null);

	const onSubmit = async (values, setSubmitting, setErrors) => {
		setSubmitting(true);
		setError(null);
		try {
			await fire.auth().signInWithEmailAndPassword(values.email, values.password)
			history.push('/events');
		} catch (err) {
			console.error('Incorrect email or password');
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
								label="Student/staff email"
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
		</PageContainer>
	);
};

export default Login;
