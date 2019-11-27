import React, { useState } from 'react'
import { Redirect } from "react-router-dom";
import Layout from '../core/Layout';
import { signin, authenticate } from "../auth/index";
//import { set } from 'mongoose';


// functional component
const Signin = () => {

  // state
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false
  })

  const { email, password, loading, error, redirectToReferrer } = values;

  // handles the informaton that is typed in the input box
  // based on the parameters that are passed with the onChange method in signupForm() function.
  const handleChange = (event, propsName) => {
    console.log()
    setValues({ ...values, error: false, [propsName]: event.target.value });
  }

  
  const clickSubmit = (event) => {

    event.preventDefault(); // prevent browser from refreshing the page. 
    setValues({ ...values, error: false, loading: true});
    // signUp function will passed the state values as it arguments.
    signin( email, password)
      .then(response => {
        console.log(response.data)
        //console.log(response.data.errors)
        if (response.data.errors) {
          setValues({
            ...values,
            error: response.data.errors,
            loading: false,
            redirectToReferrer: false
          })
        } else {

          // pass response.data as first argument in authenticate method.
          // pass as a callback function the setValues.
          // this will happen in auth/index.js file
          authenticate(response.data, ()=> {
            setValues({
              ...values,
              loading: false,
              redirectToReferrer: true,
            })
          })
        }
      })


  } // end clickSubmit

  // FUNCTIONS
  const signinForm = () => {

    return (

      <form >

        <div className="form-group">
          <label className="text-muted"> Email </label>
          <input
            type="email"
            className="form-control"
            onChange={(event) => handleChange(event, 'email')}
            value={email}
          />
        </div>

        <div className="form-group">
          <label className="text-muted"> Password </label>
          <input
            type="password"
            className="form-control"
            onChange={(event) => handleChange(event, 'password')}
            value={password}
          />
        </div>

        <button onClick={clickSubmit} className="btn btn-primary">Submit</button>

      </form>
    );

  } // END signupForm

  const showError = () => {
    return (
      <div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>
        {error}
      </div>
    )
  }

  // when user signs in, loading will change to true
  // this will return a loading bar till data comes back from server. 
  const showLoading = () => {

    return loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    )
  }

  // if redirectToReferres is true,
  // send user to Home page. 
  const redirectUser = () => {
    if(redirectToReferrer) {
      return <Redirect to="/" />
    }
  }

  return (
    <Layout title="Signin" description="Signin to Node React E-commerce App" className="container col-md-8 offset-md-2">
      {showLoading()}
      {showError()}
      {signinForm()}
      {redirectUser()}
      {JSON.stringify(values)} 
    </Layout>
  )
}

export default Signin; 