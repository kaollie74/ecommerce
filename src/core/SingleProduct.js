import React, { useState, useEffect, Fragment } from 'react'
import Layout from './Layout';
import { getProducts, read } from "./apiCore";
import Card from './Card';



const SingleProduct = (props) => {

  const [singleProduct, setSingleProduct] = useState ({

  })
  const [error, setError] = useState(false)

  useEffect( () => {

    // grab the id from the url by using props.match.params.productId
    const productId = props.match.params.productId
     loadSingleProduct(productId);
  } , [])

  const loadSingleProduct = (productId) =>{

    // read() method will make request to back end to get specific product based on its
    // id.
    read(productId)
    .then( response => {
      if(response.error) {
        console.log(response.error)
        setError(response.error)
      }
      setSingleProduct(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (

    <Fragment>
      <Layout title="Single Product" description></Layout>
      <h2 className="mb-4">Single Product</h2>
      <div className="row">
        {JSON.stringify(singleProduct)}
      </div>
    </Fragment>



  )
}

export default SingleProduct;