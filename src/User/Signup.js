import React, { useState, useEffect } from 'react'
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

  const { name, email , password } = values; 

  // handles the informaton that is typed in the input box
  // based on the parameters that are passed with the onChange method in signupForm() function.
  const handleChange = (event, propsName) => {
    console.log()
    setValues({...values, error: false, [propsName]: event.target.value});
  }

  const signUp = (name, email, password) => {
    
    console.log("in signUP: ", name, email, password);

    let newObject = {
      name: name,
      email: email,
      password: password
    }

    console.log(newObject)
    Axios.post('/api/signup', newObject )
    .then(response => {
      console.log(response)
    })
    .catch(error =>  {
      console.log(error);
    })
  }



  const clickSubmit = (event) => {

    event.preventDefault();
     signUp(name, email, password);


  }

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
          />
        </div>

        <div className="form-group">
          <label className="text-muted"> Email </label>
          <input
            type="email"
            className="form-control"
            onChange={(event) => handleChange(event, 'email')}
          />
        </div>

        <div className="form-group">
          <label className="text-muted"> Password </label>
          <input
            type="password"
            className="form-control"
            onChange={(event) => handleChange(event, 'password')}
          />
        </div>

        <button onClick ={clickSubmit}className="btn btn-primary">Submit</button>

      </form>
    );

  } // END signupForm

  return (
    <Layout title="Signup" description="Signup to Node React E-commerce App" className="container col-md-8 offset-md-2">
      {signupForm()}
      {JSON.stringify(values)}
    </Layout>
  )
}

export default Signup; 