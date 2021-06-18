import api from 'services'

export const login = async (payload) => {
  try {
    const request = await api.post(`/login`, payload)

    if (request.status === 200) {
      return request.data
    }
  } catch (err) {
    throw err
  }
}

export const signup = async (payload) => {
  try {
    const request = await api.post(`/signup`, payload)
    if (request.status === 200) {
      return request.data
    }
  } catch (err) {
    throw err
  }
}

export const retrieveDSUser = async (payload) => {
  try {
    const request = await api.get(`/retrieveDSUser`, payload)
    if (request.status === 200) {
      return request.data
    }
  } catch (err) {
    throw err
  }
}

export const updateUserInfo = async (payload) => {
  try {
    const request = await api.post(`/updateUserInfo`, payload)
    if (request.status === 200) {
      return request.data
    }
  } catch (err) {
    throw err
  }
}

export const updateUserImage = async (payload) => {
  try {
    const request = await api.post(`/updateUserImage`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (request.status === 200) {
      return request.data
    }
  } catch (err) {
    throw err
  }
}
