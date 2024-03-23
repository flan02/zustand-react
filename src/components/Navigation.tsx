/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */

import { Link } from "react-router-dom"
import { useAuthStore } from "../store/auth"


type Props = {

}

const Navigation = (_props: Props) => {
  const isLogged = useAuthStore(state => state.isLogged)
  return (
    <nav>
      <ul>
        {
          !isLogged
            ? <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
            : null
        }
        <li><Link to="/profile">Profile</Link></li>

      </ul>
    </nav>
  )
}

export default Navigation