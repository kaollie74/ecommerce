import React, { useState, useEffect } from 'react';

import Layout from "../core/Layout";
import { isAuth } from '../auth/index';
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";

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
  const {
    productName,
    description,
    price,
    categories,
    singleCategory,
    shipping,
    quantity,
    loading,
    error,
    photo,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  // load categories and set form data 

  const init = () => {
    getCategories()
      .then(response => {
        console.log(response);
        if (response.errors) {
          setValues({
            ...values,
            error: response.error
          })
        } else {
          setValues({
            ...values,
            categories: response,
            formData: new FormData()
          })
        }
      })
  }

  //use Effect will run on page load. 
  useEffect(() => {
    init()
  }, [])

  /************************************************************************* HANDLE CHANGE */
  // handle the input data using setValues method
  // to set event.target.value to the propsName passed into
  // the argument.
  const handleChange = (event, propsName) => {

    let value = propsName === 'photo' ? event.target.files[0] : event.target.value;

    //console.log("This is current value of state: " + propsName + ": " + value)
    formData.set(propsName, value);
    setValues({ ...values, [propsName]: value })

    //console.log(formData)
  }

  // const test = () => {

  //   const entries = formData.entries();
  //   let entryObj = entries.next();

  //   while (!entryObj.done) {
  //     const [key, value] = entryObj.value;
  //     console.log(key, value);
  //     entryObj = entries.next();
  //   }


  // }



  /************************************************************************* CLICK SUBMIT */
  const clickSubmit = (event) => {
    // prevent browser from refreshing
    event.preventDefault();

    // setting form data before it is sent to the backend.
    const formData2 = new FormData()
    formData2.set("photo", photo)
    formData2.set("name", productName)
    formData2.set("description", description)
    formData2.set("price", price)
    formData2.set("category", singleCategory)
    formData2.set("shipping", shipping)
    formData2.set("quantity", quantity)

    console.log("in clickSubmit");

    setValues({
      ...values,
      error: '',
      loading: true
    })



    // creatProduct is method that resides in apiAdmin.js file
    // this method will send a request to the server with the '_id', 'token', and 'formData2'
    // passed in as the argument.
    createProduct(_id, token, formData2)
      .then(response => {
        console.log(response.error);
        if (response.error) {
          setValues({ ...values, error: response.error })
        } else {
          setValues({
            ...values,
            productName: '',
            description: '',
            photo: '',
            price: '',
            quantity: '',
            loading: false,
            error: '',
            createdProduct: response.name,
          })
        }

      })
      .catch(err => {
        console.log(err);
      })


  } // end CLICK SUBMIT


  /************************************************************************* NEW PRODUCT FORM  */
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
          <textarea
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
            <option>Please Select</option>
            {categories && categories.map((item, i) => (
              <option key={i} value={item._id}>{item.name}</option>
            ))}

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
            <option>Please Select</option>
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
  } // END NEW PRODUCT FORM

  const showError = () => {
    return (
      <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
        {error}
      </div>
    )
  }
  const showSuccess = () => {
    return (
      <div className="alert alert-info" style={{ display: createdProduct ? "" : "none" }}>
        <h2>{`${createdProduct} is created`}</h2>
      </div>
    )
  }
  const showLoading = () => {
    return (
      <div>
        {loading ? "Loading..." : ""}
      </div>
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
          {showError()}
          {showSuccess()}
          {showLoading()}
          {newProductForm()}




          {JSON.stringify(singleCategory)}



        </div>

      </div>
    </Layout>
  )


}

export default AddProduct;