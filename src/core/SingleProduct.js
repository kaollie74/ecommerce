import React, { useState, useEffect, Fragment } from 'react'
import Layout from './Layout';
import { read, listRelated } from "./apiCore";
import Card from './Card';



const SingleProduct = (props) => {

  const [singleProduct, setSingleProduct] = useState({})
  const [relatedProduct, setRelatedProduct] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {

    // grab the id from the url by using props.match.params.productId
    const productId = props.match.params.productId
    loadSingleProduct(productId);

  }, [props])

  const loadSingleProduct = (productId) => {

    // read() method will make request to back end to get specific product based on its
    // id.
    read(productId)
      .then(response => {
        if (response.error) {
          console.log(response.error)
          setError(response.error)
        }
        setSingleProduct(response)
        // fetch related products
        listRelated(response._id)
          .then(response => {
            if (response.error) {
              setError(response.error);
            } else {
              setRelatedProduct(response)
            }
          }).catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (

    <Fragment>
      <Layout title={singleProduct && singleProduct.name} description={singleProduct && singleProduct.description && singleProduct.description.substring(0, 50)}></Layout>
      <div className="row">
        <div className="col-8">
          {
            singleProduct &&
            singleProduct.description &&
            < Card product={singleProduct} showViewProductButton={false} />
          }
        </div>
        <div className="col-4">
          <h4>Related Products</h4>
          {relatedProduct.map((item, i) => (
           <div  key={i} className="mb-3">
              <Card product={item} />
           </div>
          ))}
        </div>
      </div>

    </Fragment>



  )
}

export default SingleProduct;