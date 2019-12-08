import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import { getProducts } from "./apiCore";
import Card from './Card';

const Home = () => {

  // STATE
  const [productBySell, setProductsBySell] = useState([])
  const [productByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    loadProductsByArrival()
    loadProductsBySell();
  }, [])

  // function will invoke the getProducts() method that resides in /apiCore.
  // it will pass in the argument sold so ti will be sorted by that agrument.
  // if error set error to the error
  // else set ProductBySell by the repsonse which will the the products sold that come from 
  // the DB.
  const loadProductsBySell = () => {

    getProducts("sold")
      .then(response => {
        if (response.error) {
          setError(response.error)
        } else {
          setProductsBySell(response)
        }
      })
  }
  const loadProductsByArrival = () => {

    getProducts("createdAt")
      .then(response => {
        if (response.error) {
          setError(response.error)
        } else {
          setProductsByArrival(response)
        }
      })
  }

  return (
    
    <>
      <Layout title="Home Page" description="Node React E-commerce App" className="container-fluid"> </Layout>

      <h1 className="mb-4" style={{ textAlign: 'center' }}>Best Sellers</h1>

      <div className="row">
        {productBySell.map((item, i) => (
          <Card product={item} key={i} />

        ))}
      </div>

      <h2 className="mb-4" style={{ textAlign: 'center' }}>New Arrivals</h2>
      <div className="row">

        {productByArrival.map((item, i) => (
          <Card product={item} key={i} />

        ))}
      </div>
    </>

  )
}

export default Home; 