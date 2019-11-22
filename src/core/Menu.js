import React from 'react';

import { Link, withRouter } from 'react-router-dom';

// history will be the actual browser path
// path will be the 
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

      </ul>

    </div>

  )
}

export default withRouter(Menu);