import React, { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { LANGUAGES } from 'config';
import config from '../../config'

import {
	Paragraph as P,
	Heading,
	TextField,
	Button,
	Center,
	StatusMessage,
	Pill,
	EventListing,
	Spinner,
	SelectField,
} from 'components';
import { useProfileStore } from 'stores';
import fire from 'auth';

import {
	PageContainer,
	PersonalDetails,
	ProfileContainer,
	ProfilePicture,
	Events,
	LoaderWrapper,
	SmallLoaderWrapper,
	ButtonArea,
	IconInput,
	ProfilePictureEdit,
} from './profileStyle.js';
import upload_icon from 'res/upload.svg';

import {
	retrieveDSUser,
	retrieveClubs,
	retrieveEventsFeed,
	updateUserInfo,
	updateUserImage,
} from 'services';

const truncate = input => input.length > 50 ? `${input.substring(0, 50)}...` : input;

const Profile = () => {
	const { id } = useParams();
	const [currentProfile, setCurrentProfile] = useState(undefined);
	const [clubs, setClubs] = useState(undefined);
	const [events, setEvents] = useState({
		upcoming: undefined,
		attended: undefined,
	});
	const [editProfile, setEditProfile] = useState(false);
	const profileStore = useProfileStore();

	useEffect(() => {
		const fetchUserDetails = async () => {
			let user;
			if (id) {
				user = (await retrieveDSUser({uid: id})).user;
				setCurrentProfile(user);
			} else {
				if (profileStore.profile) {
					setCurrentProfile(profileStore.profile);
				}
				// Update anyway
				user = (await retrieveDSUser({uid: fire.auth().currentUser['uid']})).user;
				profileStore.setProfile(user);
				setCurrentProfile(user);
			}

			setClubs((await retrieveClubs()).clubs);

			if (user.events && user.events.length > 0) {
				const lang = profileStore.profile && profileStore.profile.lang;
				const allEvents = (await retrieveEventsFeed({ filter: '', lang: lang || 'en' })).matchingEvents;
				let attended = [];
				let upcoming = [];
				user.events.forEach(eventID => {
					const event = allEvents.find(e => e.id === eventID);
					if (event && parseInt(event.date) < DateTime.local().toMillis()) {
						if (attended.length < 3) {
							attended.push(event);
						}
					} else if (event) {
						if (upcoming.length < 3) {
							upcoming.push(event);
						}
					}
				});
				setEvents({ attended, upcoming });
			}
		}
		fetchUserDetails();
	}, [id]);

	const onSubmitUserInfo = async (values, setSubmitting) => {
		setSubmitting(true);
		try {
			const response = await updateUserInfo({
				userID: profileStore.profile.id,
				username: values.username,
				description: values.description,
				lang: values.lang,
			});

			if (response.success) {
				// Update user
				const user = (await retrieveDSUser({uid: fire.auth().currentUser['uid']})).user;
				profileStore.setProfile(user);
				setCurrentProfile(user);
				setEditProfile(false);
			} else {
				console.error('Error while updating user info');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	const onSubmitUserIcon = async file => {
		if (file) {
			try {
				const formData = new FormData();
				formData.append('userID', profileStore.profile.id);
				formData.append('icon', file);

				const response = await updateUserImage(formData);

				if (response.success) {
					setCurrentProfile({...currentProfile, icon: response.icon});
				} else {
					console.error('Failed to change profile image');
				}
			} catch (e) {
				console.error(e);
			}
		}
	};

	return (
		<>
			<PageContainer>
				<PersonalDetails>
					{currentProfile && (
						<>
							{!id ? (
								<ProfilePictureEdit title="Upload a new profile picture">
									<ProfilePicture src={currentProfile.icon} alt="" />
									<img src={upload_icon} alt="" className="uploadIcon" />
									<IconInput type="file" onInput={e => onSubmitUserIcon(e.currentTarget.files[0])} />
								</ProfilePictureEdit>
							) : (
								<ProfilePicture src={currentProfile.icon} alt="" />
							)}

							{editProfile ? (
								<Formik
									initialValues={{
										username: currentProfile.username,
										description: currentProfile.description,
										lang: currentProfile.lang,
									}}
									validationSchema={Yup.object({
										username: Yup
											.string()
											.ensure()
											.required('Name is required'),
										description: Yup
											.string()
											.ensure(),
										lang: Yup.string(),
									})}
									onSubmit={(values, { setSubmitting }) => {
										onSubmitUserInfo(values, setSubmitting);
									}}
								>
									{props => (
										<Form>
											<TextField
												name="username"
												label="Name"
												placeholder="Jenny Bit"
												required
											/>
											<TextField
												name="description"
												label="About"
												as="textarea"
											/>
											<SelectField
												name="lang"
												label="Language"
												options={LANGUAGES}
												required
											/>

											<ButtonArea>
												<Button type="button" onClick={() => setEditProfile(false)} secondary>Cancel</Button>
												<Button type="submit" disabled={!(props.isValid && props.dirty)} loading={props.isSubmitting}>Update</Button>
											</ButtonArea>
										</Form>
									)}
								</Formik>
							) : (
								<>
									<Heading>{currentProfile.username} {!id && '(you)'}</Heading>
									<P>{currentProfile.description}</P>
									{!id && (
										<Button onClick={() => setEditProfile(true)}>Edit profile</Button>
									)}

									<Heading size="h2">{'Clubs'}</Heading>
									{currentProfile.subscribed.length > 0 ? (
										clubs ? currentProfile.subscribed.map(clubID => {
											const club = clubs.find(c => c.id == clubID);
											return club && (
												<Pill
													key={clubID}
													icon={club.icon}
													label={clubID} href={`clubs/${clubID}`}
													title={club.name}
												/>
											);
										}) : (
											<SmallLoaderWrapper><Spinner size={16} /></SmallLoaderWrapper>
										)
									) : (
										<P>Not a member of any clubs</P>
									)}
								</>
							)}
						</>
					)}
				</PersonalDetails>

				<ProfileContainer>
					{currentProfile ? (
						<>
							<Heading size="h2">Recent event attendance</Heading>
							{events.attended ? (
								events.attended.length > 0 ? (
									<Events>
										{events.attended.map((event, i) =>
											<EventListing
												key={i}
												linkTo={`events/${event.id}`}
												name={event.name}
												image={event.image}
												date={DateTime.fromMillis(event.date).toFormat('t, DD')}
												description={truncate(event.description)}
												hostingClubs={event.hostingClubs.join(", ")}
											/>
										)}
									</Events>
								) : (
									<P>No events attended, yet</P>
								)
							) : (
								<SmallLoaderWrapper><Spinner size={16} /></SmallLoaderWrapper>
							)}

							<Heading size="h2">Upcoming events registered</Heading>
							{events.upcoming ? (
								events.upcoming.length > 0 ? (
									<Events>
										{events.upcoming.map((event, i) =>
											<EventListing
												key={i}
												linkTo={`events/${event.id}`}
												name={event.name}
												image={event.image}
												date={DateTime.fromMillis(event.date).toFormat('t, DD')}
												description={truncate(event.description)}
												hostingClubs={event.hostingClubs.join(", ")}
											/>
										)}
									</Events>
								) : (
									<P>Not going to any upcoming events</P>
								)
							) : (
								<SmallLoaderWrapper><Spinner size={16} /></SmallLoaderWrapper>
							)}
						</>
					) : (
						<LoaderWrapper>
							<Spinner size={36} />
						</LoaderWrapper>
					)}
				</ProfileContainer>
			</PageContainer>
		</>
	);
};

export default Profile;
