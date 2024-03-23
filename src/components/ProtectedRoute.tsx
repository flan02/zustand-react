/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Navigate, Outlet } from "react-router-dom"

type Props = {
  isLogged: boolean
  children?: React.ReactNode // * This props enables receiving childrens
}

export const ProtectedRoute = ({ isLogged, children }: Props) => {
  if (!isLogged) return <Navigate to="/login" />
  return children ? <>{children}</> : <Outlet />  // * if return one component use children if there are more return <Outlet />
}

/*
export const NotLoggedRoute = ({ isLogged, children }: Props) => {
  if (isLogged) return null
  return children ? <>{children}</> : <Outlet />
}
*/