import { useEffect } from 'react'
import fire from 'auth'
import create from 'zustand'

import { retrieveDSUser } from 'services'

const useProfileStore = create((set) => ({
  profile: null,
  setProfile: (profile) => set((state) => ({ profile })),
  clearProfile: () => set((state) => ({ profile: null })),
}))

export default function useCurrentProfile() {
  const { profile, setProfile, clearProfile } = useProfileStore()

  useEffect(() => {
    const fetchUserDetails = async () => {
      // Retrieve user by fire-stored uid.
      let { user } = await retrieveDSUser({
        uid: fire.auth().currentUser['uid'],
      })

      // Retry every 2 seconds until user does exist
      if (!user.username) {
        setTimeout(fetchUserDetails, 2000)
      } else {
        // Add the id from the firestore
        user.id = fire.auth().currentUser['uid']
        setProfile(user)
      }
    }

    // Fetch user details if we don't have them but firestore does
    if (fire.auth().currentUser && !profile) {
      fetchUserDetails()
    }
  })

  return [profile, clearProfile]
}
