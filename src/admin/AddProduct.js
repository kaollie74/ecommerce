import React, { useState, useEffect } from 'react';

import Layout from "../core/Layout";
import { isAuth } from '../auth/index';
import { Link } from "react-router-dom";
import { createProduct } from "./apiAdmin";

const AddProduct = () => {

  const {user: { _id, name, email}, token } = isAuth();

  return (

    <Layout
      title="Add a New Product"
      description={`Hello ${name}, ready to add new product?`}
      className="container-fluid"

    >
      
      <div className="row">
        <div className="col-md-8 offset-md-2">

          {JSON.stringify()}
       
        </div>

      </div>
    </Layout>
  )


}

export default AddProduct;