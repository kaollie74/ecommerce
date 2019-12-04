import React, {useState, useEffect} from 'react'
import Layout from './Layout';
import {getProducts} from "./apiCore";

const Home = () => {

  // STATE
  const [productBySell, setProductsBySell] = useState([])
  const [productByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false)

  useEffect(()=> {
    loadProductsByArrival()
    loadProductsBySell();
  } , [])

  // function will invoke the getProducts() method that resides in /apiCore.
  // it will pass in the argument sold so ti will be sorted by that agrument.
  // if error set error to the error
  // else set ProductBySell by the repsonse which will the the products sold that come from 
  // the DB.
  const loadProductsBySell = () => {

    getProducts("sold")
    .then(response => {
      if(response.error) {
        setError(response.error)
      } else {
        setProductsBySell(response)
      }
    })
  }
  const loadProductsByArrival = () => {

    getProducts("createdAt")
    .then(response => {
      if(response.error) {
        setError(response.error)
      } else {
        setProductsByArrival(response)
      }
    })
  }
  
  return (
    <Layout title="Home Page" description="Node React E-commerce App">
      { JSON.stringify(productByArrival)}
      <br/>
      <br/>
      {JSON.stringify(productBySell)}
    </Layout>
  )
}

export default Home; 