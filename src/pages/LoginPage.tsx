/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */

import React from "react"
import { loginRequest } from "../api/auth"
import { useAuthStore } from "../store/auth"


type Props = {}

const LoginPage = (_props: Props) => {
  // const tokenStore = useAuthStore(state => state.setToken)
  const tokenStore = useAuthStore() // TODO Another way to use Zustand props
  const [token, setToken] = React.useState<string | null>(null) // [state, setState
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // FormEvent: it gives me autocompletion for event types
    e.preventDefault()
    const email = (e.currentTarget.elements[0] as HTMLInputElement).value
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value
    //console.log(email, password);
    const res = await loginRequest(email, password)
    console.log(res.data); // * This is data you need to store with Zustand
    //tokenStore(res.data.token)
    tokenStore.setToken(res.data.token)
    setToken(res.data.token)
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
    </>
  )
}

export default LoginPage