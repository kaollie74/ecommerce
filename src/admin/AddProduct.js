import React, { useState, useEffect } from 'react';

import Layout from "../core/Layout";
import { isAuth } from '../auth/index';
import { Link } from "react-router-dom";
import { createProduct } from "./apiAdmin";

const AddProduct = () => {

  //STATE 
  const [values, setValues] = useState({
    productName: '',
    description: "",
    price: "",
    categories: [],
    singleCategory: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: "",
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
  });

  // destructuring from isAuth method that resides in /auth/index.js
  const { user: { _id, name, email }, token } = isAuth();

  // destructuring local state 
  const { productName,
    description,
    price,
    categories,
    singleCategory,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData } = values;

    useEffect( () => {
      setValues({...values, formData: new FormData()})
    }, [])

  const handleChange = (event, propsName) => {

    //let value = propsName === 'photo' ? event.target.files[0] : event.target.value;

    setValues({ ...values, [propsName]: event.target.value })
    formData.set(propsName, event.target.value);
  }

  const clickSubmit = (event) => {
    event.preventDefault();
    console.log("in clickSubmit");
  }

  const newProductForm = () => {

    return (


      <form className="mb-3" onSubmit={clickSubmit}>

        <h4>Post Photo</h4>
        {  /**************************************** PHOTO */}
        <div className="form-group">
          <label className="btn btn-secondary">
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(event) => handleChange(event, "photo")}
            />
          </label>
        </div>

        {/****************************************************** PRODUCT NAME */}
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            value={productName}
            onChange={(event) => handleChange(event, "productName")}
          />
        </div>
        {/****************************************************** DESCRIPTION */}
        <div className="form-group">
          <label className="text-muted">Description</label>
          <textArea
            type="text"
            className="form-control"
            value={description}
            onChange={(event) => handleChange(event, "description")}
          />
        </div>
        {/****************************************************** PRICE */}
        <div className="form-group">
          <label className="text-muted">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(event) => handleChange(event, "price")}
          />
        </div>
        {/****************************************************** SINGLE CATEGORY */}
        <div className="form-group">
          <label className="text-muted">Category</label>
          <select
            type="text"
            className="form-control"
            value={singleCategory}
            onChange={(event) => handleChange(event, "singleCategory")}
          >
            <option value="none" selected disabled> Select A Category </option>
            <option value="5dc0d7b1a860942c0d9f52ae">Node.js</option>
            <option value="">PHP</option>
          </select>
        </div>
        {/****************************************************** SHIPPING */}
        <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select
            type="text"
            className="form-control"
            value={shipping}
            onChange={(event) => handleChange(event, "shipping")}
          >
            <option value="none" selected disabled> Select A Shipping Preference </option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        {/****************************************************** QUANTITY */}
        <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={(event) => handleChange(event, "quantity")}
          />
        </div>

        <button className="btn btn-outline-primary">Create Product</button>


      </form>
    )
  }

  return (

    <Layout
      title="Add a New Product"
      description={`Hello ${name}, ready to add new product?`}
      className="container-fluid"

    >

      <div className="row">
        <div className="col-md-8 offset-md-2">
          {newProductForm()}

          {JSON.stringify(values)}

        </div>

      </div>
    </Layout>
  )


}

export default AddProduct;