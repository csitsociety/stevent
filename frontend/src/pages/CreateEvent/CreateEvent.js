import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { createClubEvent } from 'services';

import {
	Container,
	FormWrapper,
} from './createEventStyle';

import {
	Heading,
	Paragraph as P,
	Pill,
	TextField,
	Button,
	StatusMessage,
	Center,
	MultiSelect,
} from 'components';
import { useProfileStore } from 'stores';

const validationSchema = Yup.object({
	name: Yup
		.string()
		.ensure()
		.required('Event name is required'),
	image: Yup
		.string()
		.ensure()
		.required('Image is required'),
	date: Yup
		.string()
		.ensure()
		.required('Date is required'),
	location: Yup
		.string()
		.ensure(),
	description: Yup
		.string()
		.ensure()
		.required('Description is required'),
	hostingClubs: Yup
		.mixed()
		.test('oneSelected', 'At least one club must be hosting the event', value => value && value.length > 0),
});

const initialValues = {
	name: '',
	date: '',
	location: '',
	image: '',
	description: '',
	hostingClubs: [],
};

const CreateEvent = () => {
	const profile = useProfileStore(state => state.profile);
	const history = useHistory();
	const [error, setError] = useState(null);
	const [image, setImage] = useState(undefined);

	useEffect(() => {
		if (!profile || !profile.adminClubs || profile.adminClubs.length == 0) {
			history.push('/events');
		}
	}, [profile]);

	const onSubmit = async (values, setSubmitting, setErrors) => {
		setSubmitting(true);
		setError(null);
		try {
			const formData = new FormData();
			formData.append('name', values.name);
			formData.append('date', DateTime.fromISO(values.date).toMillis());
			formData.append('location', values.location);
			formData.append('hostingClubs', JSON.stringify(values.hostingClubs));
			formData.append('description', values.description);
			formData.append('image', image);

			const response = await createClubEvent(formData);

			if (response.success) {
				history.push(`/events/${response.key && response.key.id}`);
			} else {
				setErrors(response.errors);
				if (response.errors.main) {
					setError(response.errors.main);
				}
			}
		} catch (error) {
			console.error(error);
			setError('An error occured, please try again');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Container>
			<FormWrapper>
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
								name="name"
								label="Event name"
								placeholder="Notion Workshop"
								required
							/>
							<TextField
								name="image"
								label="Event banner"
								type="file"
								onChange={e => {
									setImage(e.currentTarget.files[0]);
									props.handleChange(e);
								}}
								required
							/>
							<TextField
								name="date"
								label="Date and time"
								type="datetime-local"
								required
							/>
							<TextField
								name="location"
								label="Location"
								placeholder="Building 80, Level 2"
							/>
							<TextField
								name="description"
								label="Description"
								as="textarea"
								rows="6"
								required
							/>
							<MultiSelect
								name="hostingClubs"
								label="Event run by"
								options={profile && profile.adminClubs}
								required
							/>

							<Center>
								<Button
									type="submit"
									disabled={!(props.isValid && props.dirty)}
									loading={props.isSubmitting}
								>Create event</Button>
							</Center>
						</Form>
					)}
				</Formik>
			</FormWrapper>
		</Container>
	)
}

export default CreateEvent;
