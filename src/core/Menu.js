import React, { Fragment } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { signout, isAuth } from "../auth/index";
import { itemTotal } from "./cartHelpers";

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
          <Link className="nav-link" style={isActive(history, "/shop")} to="/shop">
            Shop
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/cart")} to="/cart">
            Cart <sup><small className="cart-badge">{itemTotal()}</small></sup>
          </Link>
        </li>

        {isAuth() && isAuth().user.role !== 0 ?

          <li className="nav-item">
            <Link className="nav-link" style={isActive(history, "/admin/dashboard")} to="/admin/dashboard">
              Admin DashBoard
            </Link>
          </li>

          :


          <li className="nav-item">
            <Link className="nav-link" style={isActive(history, "/user/dashboard")} to="/user/dashboard">
              DashBoard
            </Link>
          </li>


        }

        {/* {isAuth() && isAuth().user.role === 1 && (
           <li className="nav-item">
           <Link className="nav-link" style={isActive(history, "/admin/dashboard")} to="/admin/dashboard">
             Admin DashBoard
            </Link>
         </li>
        )} */}



        {/** if isAuth() return false, then "Signin" && "Signup"
         * will conditionally render to the Menu bar */}
        {!isAuth() && (
          <Fragment>
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
          </Fragment>
        )}

        {/* if isAuth() return true, then "Signout"
         * will conditionally render to the Menu bar */}
        {isAuth() && (
          <div>
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "white" }}
                onClick={() => signout(() => {
                  history.push("/")
                })}>

                Signout
          </span>
            </li>
          </div>
        )}

      </ul>

    </div>

  )
}

export default withRouter(Menu);