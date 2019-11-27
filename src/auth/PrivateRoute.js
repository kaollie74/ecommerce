import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => (

   <Route 
    {...rest} 
    render={props => 
      isAuth() ? (

    <Component {...props} />

  ) : (
      alert("You must be signed in, in order to access dashboard"),
      <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
    )} 
    />
  )



export default PrivateRoute; 