import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from "./index";

const AdminRoute = ({ component: Component, ...rest }) => (

   <Route 
    {...rest} 
    render={props => 
      isAuth() && isAuth().user.role === 1 ? (

    <Component {...props} />

  ) : (
      alert("You must be Admin in order to access dashboard"),
      <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
    )} 
    />
  )



export default AdminRoute; 