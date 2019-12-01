import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuth } from "../auth/index";
import { Link } from 'react-router-dom';

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


    // make request API to create category

  }

  const handleChange = (event, propsName) => {
    setError('')
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
          />
         
        </div>
        <button className="btn btn-outline-primary"> Create Category </button>
      </form>
    )
  }

  return (

    <Layout
      title="Add a New Category"
      description={`Hello ${name}, ready to add new category`}
      className="container-fluid"

    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {newCategoryForm()}
          {JSON.stringify(categoryName)}
        </div>
      </div>
    </Layout>
  )


}// END AddCategory

export default AddCategory; 