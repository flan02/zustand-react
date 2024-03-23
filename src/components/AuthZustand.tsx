/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
//import ZustandBasics from "./components/ZustandBasics"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginPage from "../pages/LoginPage"
import ProfilePage from "../pages/ProfilePage"
import RegisterPage from "../pages/RegisterPage"
import HomePage from "../pages/HomePage"
import Navigation from "./Navigation"
import { ProtectedRoute } from "./ProtectedRoute"

import { useAuthStore } from "../store/auth"

type Props = {}

const AuthZustand = (_props: Props) => {
  const isLogged = useAuthStore(state => state.isLogged)
  return (

    <BrowserRouter>
      <Navigation />
      <Routes>
        {
          !isLogged
            ? <>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </>
            : null


        }





        <Route element={<ProtectedRoute isLogged={isLogged} />}>
          <Route path="/profile" element={<ProfilePage />} />
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        </Route>
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>


  )
}

export default AuthZustand