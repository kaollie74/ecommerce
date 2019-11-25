import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Layout from '../core/Layout';
import Axios from 'axios';

const Signup = () => {

  // state
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  })

  const { name, email, password, success, error } = values;

  // handles the informaton that is typed in the input box
  // based on the parameters that are passed with the onChange method in signupForm() function.
  const handleChange = (event, propsName) => {
    console.log()
    setValues({ ...values, error: false, [propsName]: event.target.value });
  }

  /************************************************************************* SIGN UP *********/
  const signUp = (name, email, password) => {

    //console.log("in signUP: ", name, email, password);

    // newObject will be set to server 
    let newObject = {
      name: name,
      email: email,
      password: password
    }

    // send Axios.post to server to sign new user up
    return Axios.post('/api/signup', newObject)

      .then(response => {
        console.log(response)
        return response
      })// end then
      .catch(error => {
        console.log(error);
        return error

      })// end catch

  } // END signUp



  const clickSubmit = (event) => {

    event.preventDefault(); // prevent browser from refreshing the page. 

    // signUp function will passed the state values as it arguments.
    signUp(name, email, password)
      .then(response => {
        console.log(response.data)
        console.log(response.data.errors)
        if (response.data.errors) {
          setValues({
            ...values,
            error: response.data.errors,
            success: false
          })
        } else {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            error: '',
            success:
              true
          })
        }
      })


  } // end clickSubmit

  // FUNCTIONS
  const signupForm = () => {

    return (

      <form >

        <div className="form-group">
          <label className="text-muted"> Name </label>
          <input
            type="text"
            className="form-control"
            onChange={(event) => handleChange(event, 'name')}
            value={name}
          />
        </div>

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

  const showSuccess = () => {


    return (
      <div className="alert alert-info" style={{ display: success ? "" : "none" }} >
        New account is created. Please <Link to='/signin'>Signin</Link>
    </div>
    )
  }

  return (
    <Layout title="Signup" description="Signup to Node React E-commerce App" className="container col-md-8 offset-md-2">
      {showSuccess()}
      {showError()}
      {signupForm()}
      {JSON.stringify(values)}
    </Layout>
  )
}

export default Signup; 