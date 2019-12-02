import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuth } from "../auth/index";
import { Link } from 'react-router-dom';

//import methods from apiAdmin.js
import { createCategory } from './apiAdmin';

const AddCategory = () => {

  //STATE
  // 'name' is the name of state
  // 'setName' is the method used to setState
  const [categoryName, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localStorage
  const { user: { _id, email, name, role }, token } = isAuth();

  const clickSubmit = (event) => {

    event.preventDefault();
    setError("");
    setSuccess(false);

    let newObject = {
      token: token,
      _id: _id,
      name: categoryName
    }

    createCategory(newObject)
      .then(response => {
        console.log(response);
        if (response.errors) {
          setError(response.errors)
          setName('')
        } else {
          setError("");
          setSuccess(true)
          setName('')

        }
      })




    // make request API to create category

  }

  const handleChange = (event, propsName) => {
    setError('')
    setSuccess(false);
    setName(event.target.value)
  }

  const newCategoryForm = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted">
            Category Name
        </label>
          <input
            type="text"
            className="form-control"
            onChange={(event) => handleChange(event, 'categoryName')}
            value={categoryName}
            autoFocus
            required
          />

        </div>
        <button className="btn btn-outline-primary"> Create Category </button>
      </form>
    )
  }

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success" >Category has been successfully created</h3>
    }
  }

  const showError = () => {
    if (error) {
      return <h3 className="text-danger" >{error}</h3>
    }
  }

  const goBack = () => {
    return <div className="mt-4">
      <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>

    </div>
  }

  return (

    <Layout
      title="Add a New Category"
      description={`Hello ${name}, ready to add new category`}
      className="container-fluid"

    >
      {showError()}
      {showSuccess()}
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {newCategoryForm()}
          {JSON.stringify(categoryName)}
          {goBack()}
        </div>
        
      </div>
    </Layout>
  )


}// END AddCategory

export default AddCategory; 