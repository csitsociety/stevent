import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import {
	Paragraph as P,
	Heading,
	TextField,
	Button,
	Center,
} from 'components';
import { useAuthStore } from 'stores';
import { signup } from 'services';

import { PageContainer, FormWrapper, LogoWrapper } from '../Login/loginStyle';

import logo from 'res/logo.svg';

const validationSchema = Yup.object({
	username: Yup.string().ensure().required('Student/staff number is required'),
	email: Yup.string().ensure().required('Email is required'),
	password: Yup.string().ensure().required('You need a password'),
	passwordAgain: Yup.string().ensure().required('You need to enter your password twice'),
});

const initialValues = {
	username: '',
	email: '',
	password: '',
	passwordAgain: '',
};

const Signup = () => {
	const history = useHistory();
	const auth = useAuthStore();

	useEffect(() => {
		if (auth.isAuthenticated) {
			history.push('/events');
		}
	}, [auth, history]);

	const onSubmit = async (values, setSubmitting, setErrors) => {
		setSubmitting(true);
		try {
			const response = await signup({
				username: values.username,
				email: values.email,
				password: values.password,
			});
			if (response.success) {
				auth.login(response.username);
			} else {
				//TODO: error
				alert(response.msg);
			}
		} catch (error) {
			console.error(error);
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
