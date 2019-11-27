import React from 'react';

import { Link, withRouter } from 'react-router-dom';
import { signout } from "../auth/index"

// history will be the actual browser path
// path will be the what we assign it to. 
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "orange" }
  } else {
    return { color: "white" }
  }
}

// history is a prop that is accessible since we are using withRouter
const Menu = ({ history }) => {

  return (

    <div>
      <ul className="nav nav-tabs bg-primary">

        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">
            Signin
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">
            Signup
          </Link>
        </li>

        <li className="nav-item">
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "white" }}
            onClick={() => signout( () => {
              history.push("/")
            })}>
              
            Signout
          </span>
        </li>

      </ul>

    </div>

  )
}

export default withRouter(Menu);