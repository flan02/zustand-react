/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useAuthStore } from '../store/auth'
import { useNavigate } from 'react-router-dom'

type Props = {}

const ProfilePage = (_props: Props) => {
  const navigate = useNavigate()
  const isLogged = useAuthStore(state => state.logout)
  const profile = useAuthStore(state => state.profile)
  const logout = () => {
    isLogged()
    navigate('/')
  }


  return (
    <>
      <h2>ProfilePage</h2>
      <div>
        {JSON.stringify(profile, null, 2)}
      </div>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default ProfilePage