import React, { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

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
	ProfileIcon
} from 'components';
import { useProfileStore } from 'stores';
import fire from 'auth';

import {
	PageContainer,
	PersonalDetails,
	ProfileContainer,
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
				// Update anyway
				user = (await retrieveDSUser({uid: fire.auth().currentUser['uid']})).user;
				user.id = fire.auth().currentUser['uid']
				profileStore.setProfile(user);
				setCurrentProfile(user);
			}

			setClubs((await retrieveClubs()).clubs);

			if (user.events && user.events.length > 0) {
				const allEvents = (await retrieveEventsFeed({ filter: ''})).events;
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
			} else {
				setEvents({ attended: [], upcoming: [] });
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
									<ProfileIcon profile={currentProfile}/>
									<img src={upload_icon} alt="" className="uploadIcon" />
									<IconInput type="file" onInput={e => onSubmitUserIcon(e.currentTarget.files[0])} />
								</ProfilePictureEdit>
							) : (
								<ProfileIcon profile={currentProfile}/>
							)}

							{editProfile ? (
								<Formik
									initialValues={{
										username: currentProfile.username,
										description: currentProfile.description,
									}}
									validationSchema={Yup.object({
										username: Yup
											.string()
											.ensure()
											.required('Name is required'),
										description: Yup
											.string()
											.ensure(),
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
									{(currentProfile.subscribed ? currentProfile.subscribed.length : 0)> 0 ? (
										clubs ? currentProfile.subscribed.map(clubID => {
											const club = clubs.find(c => c.id == clubID);
											return club && (
												<Pill
													key={clubID}
													icon={club.icon}
													label={clubID} href={`/clubs/${clubID}`}
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
							<Heading size="h2">Upcoming events registered</Heading>
							{events.upcoming ? (
								events.upcoming.length > 0 ? (
									<Events>
										{events.upcoming.map((event, i) =>
											<EventListing
												key={i}
												linkTo={`/events/${event.id}`}
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
