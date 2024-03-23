/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */

import React from "react"
import { loginRequest, profileRequest } from "../api/auth"
import { useAuthStore, useCredentialsStore } from "../store/auth"
import { useNavigate } from "react-router-dom"

type Props = {}

interface ICredentials {
  email: string
  password: string

}
interface IUser {
  credentials: ICredentials
  exp: number
  iat: number
}

const LoginPage = (_props: Props) => {
  const navigate = useNavigate()
  // const tokenStore = useAuthStore(state => state.setToken)
  const tokenStore = useAuthStore() // TODO Another way to use Zustand props
  const credentialsStore = useCredentialsStore()
  const [token, setToken] = React.useState<string | null>(null)
  const [profile, setProfile] = React.useState<IUser | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // FormEvent: it gives me autocompletion for event types
    e.preventDefault()
    const email = (e.currentTarget.elements[0] as HTMLInputElement).value
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value

    const resLogin = await loginRequest(email, password)
    //console.log(resLogin); // * This is data you need to store with Zustand

    tokenStore.setToken(resLogin.data.token)

    const resProfile = await profileRequest() // * ...Calling API for the user data
    //console.log(resProfile); // * This is the user data after he is logged in
    const profile = resProfile.data.profile.user
    tokenStore.setProfile(profile)
    credentialsStore.setCredentials(profile.credentials)
    setToken(resLogin.data.token)
    setProfile(profile)
    navigate("/profile")
  }
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input type="email" name="" id="" placeholder="email@hotmail.com" />
        <input type="password" placeholder="******" />
        <button type="submit">Login</button>
      </form>
      {
        token ? <p>Your Token is: {token}</p> : <p>Any token registered yet.</p>
      }
      <br />
      <h3>Your user credentials are:</h3>
      {
        profile
          ? <>
            <p>Your email is: {profile.credentials.email}</p>
            <p>Your password is: {profile.credentials.password}</p>
          </>
          : <p>You don't have access to your credentials right now. Please logged in.</p>
      }

    </>
  )
}

export default LoginPage