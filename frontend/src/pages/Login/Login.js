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
import { login } from 'services';

import { PageContainer, FormWrapper, LogoWrapper } from './loginStyle';

import logo from 'res/logo.svg';

const validationSchema = Yup.object({
	username: Yup.string().ensure().required('Student/staff number is required'),
	password: Yup.string().ensure().required('Password is required'),
});

const initialValues = {
	username: '',
	password: '',
};

const Login = () => {
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
			const response = await login({
				username: values.username,
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
				<Heading>Login</Heading>
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
