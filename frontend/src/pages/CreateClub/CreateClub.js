import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { createClubPage } from 'services'

import { Container, FormWrapper } from './createClubStyle'

import { TextField, Button, StatusMessage, Center } from 'components'
import { useCurrentProfile } from 'hooks'

const validationSchema = Yup.object({
  clubID: Yup.string().ensure().required('Club ID is required'),
  name: Yup.string().ensure().required('Club name is required'),
  icon: Yup.string().ensure().required('Icon is required'),
  description: Yup.string().ensure().required('Description is required'),
  discord: Yup.string().ensure(),
  facebook: Yup.string().ensure(),
  linkedin: Yup.string().ensure(),
  joinLink: Yup.string().ensure(),
})

const initialValues = {
  clubID: '',
  name: '',
  icon: '',
  description: '',
  discord: '',
  facebook: '',
  linkedin: '',
  joinLink: ''
}

const CreateClub = () => {
  const [profile] = useCurrentProfile()
  const history = useHistory()
  const [error, setError] = useState(null)
  const [icon, setIcon] = useState(undefined)

  useEffect(() => {
    if (!profile || !profile.superadmin) {
      history.push('/clubs')
    }
  }, [profile, history])

  const onSubmit = async (values, setSubmitting, setErrors) => {
    setSubmitting(true)
    setError(null)
    try {
      const formData = new window.FormData()
      formData.append('clubID', values.clubID)
      formData.append('name', values.name)
      formData.append('description', values.description)
      formData.append('icon', icon)
      formData.append('discord', values.discord)
      formData.append('facebook'. values.facebook)
      formData.append('linkedin'. values.linkedin)
      formData.append('joinLink', values.joinLink)

      const response = await createClubPage(formData)

      if (response.success) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        history.push(`/clubs/${values.clubID}`)
      } else {
        setErrors(response.errors)
        if (response.errors && response.errors.main) {
          setError(response.errors.main)
        }
      }
    } catch (error) {
      console.error(error)
      setError('An error occured, please try again')
    } finally {
      setSubmitting(false)
    }
  }

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
            onSubmit(values, setSubmitting, setErrors)
          }}
        >
          {(props) => (
            <Form>
              <TextField
                name="clubID"
                label="Club ID"
                placeholder="CSIT"
                required
              />
              <TextField
                name="name"
                label="Club name"
                placeholder="Computer Science and Information Technology Society"
                required
              />
              <TextField
                name="icon"
                label="Club icon"
                type="file"
                onChange={(e) => {
                  setIcon(e.currentTarget.files[0])
                  props.handleChange(e)
                }}
                required
              />
              <TextField
                name="description"
                label="Description"
                as="textarea"
                rows="6"
                required
              />
              <TextField
                name="discord"
                label="Discord link"
                type="url"
                placeholder="https://discord.gg/abc123"
              />
              <TextField
                name="facebook"
                label="Facebook link"
                type="url"
                placeholder="https://www.facebook.com/club"
              />
              <TextField
                name="linkedin"
                label="LinkedIn link"
                type="url"
                placeholder="https://www.linkedin.com/company/club/"
              />
              <TextField
                name="joinLink"
                label="Join link"
                type="url"
                placeholder="https://forms.google.com/join"
              />
              <Center>
                <Button
                  type="submit"
                  disabled={!(props.isValid && props.dirty)}
                  loading={props.isSubmitting}
                >
                  Create club
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </Container>
  )
}

export default CreateClub
