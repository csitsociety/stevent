import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';

import { Paragraph as P, Heading, Button, Center } from 'components';
import { useAuthStore } from 'stores';
import { login } from 'services';

import { LoginForm, SignupForm } from './forms';
import { PageContainer, FormWrapper, LogoWrapper } from './loginStyle';

import logo from 'res/logo.svg';

const Login = () => {
	const history = useHistory();
	const auth = useAuthStore();
	const [mode, setMode] = useState('login');

	useEffect(() => {
		if (auth.isAuthenticated) {
			history.push('/events');
		}
	}, [auth, history]);

	const onLoginSubmit = async (values, setSubmitting, setErrors) => {
		setSubmitting(true);
		try {
			const response = await login(values.username, values.password);
			if (response.success) {
				auth.login(response.username);
			} else {
				//TODO
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
				{mode === 'login' ? (
					<>
						<Heading>Login</Heading>
						<Formik
							initialValues={LoginForm.initialValues}
							validationSchema={LoginForm.Validation}
							onSubmit={(values, { setSubmitting, setErrors }) => {
								onLoginSubmit(values, setSubmitting, setErrors);
							}}
						>
							{props => (
								<Form>
									<LoginForm.Form />

									<Center>
										<Button
											type="submit"
											disabled={!(props.isValid && props.dirty)}
											loading={props.isSubmitting}
										>Login</Button>
										<P>
											Don't have an account? <a href="#" onClick={e => {
												e.preventDefault();
												setMode('register');
											}}>Register here!</a>
										</P>
									</Center>
								</Form>
							)}
						</Formik>
					</>
				) : (
					<>
						<Heading>Sign up</Heading>
						<Formik
							initialValues={SignupForm.initialValues}
							validationSchema={SignupForm.Validation}
							onSubmit={(values, { setSubmitting, setErrors }) => {
								//onSubmit(values, setSubmitting, setErrors);
								console.log(values, setSubmitting, setErrors);
							}}
						>
							{props => (
								<Form>
									<SignupForm.Form />

									<Center>
										<Button
											type="submit"
											disabled={!(props.isValid && props.dirty)}
											loading={props.isSubmitting}
										>Sign up</Button>
										<P>
											Already have an account? <a href="#" onClick={e => {
												e.preventDefault();
												setMode('login');
											}}>Login here!</a>
										</P>
									</Center>
								</Form>
							)}
						</Formik>
					</>
				)}
			</FormWrapper>
		</PageContainer>
	);
};

export default Login;
