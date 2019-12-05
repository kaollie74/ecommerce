import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import Card from './Card';
import {getCategories} from "./apiCore";



const Shop = () => {

  const[categories, setCategories] = useState([])
  const[error, setError] = useState(false)

  useEffect( () => {
    init();
  }, [])
  const init = () => {
    getCategories()
      .then(response => {
        console.log(response);
        if (response.errors) {
          setError(response.errors)
        } else {
          setCategories(response);
        }
      })
  }

  return (
    <>
      <Layout
        title="Shop Page"
        description="Search and find books of your choice"
        className="container-fluid"
      >
        <div className="row">
          <div className="col-4">left sidebar</div>
          <div className="col-8">right sidebar </div>
        </div>
      </Layout>
      {JSON.stringify(categories)};
    </>

  )


}// END SHOP

export default Shop;

