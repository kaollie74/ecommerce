import React from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from './apiCore';
import ShowImage from './ShowImage';
import moment from "moment";

const Card = ({ product, showViewProductButton = true }) => {

  // showViewProductButton as an agrument is set to default true.
  // when its passed in from SingleProduct Component, it switches to false
  // this will prevent the button from rendering to the page
  const showViewButton = (showViewProductButton) => {

    // if showViewProductButton is true, the code after will run
    return showViewProductButton && (
      <Link to={`/single/product/${product._id}`}>
        <button className="btn btn-outline-warning mt-2 mb-2 mr-2"> View product</button>
      </Link>
    )
  }

  const showAddToCartButton = () => {
    return (
      <button className="btn btn-outline-danger mt-2 mb-2"> Add to Cart</button>
    )
  }

  const showStock = (quantity) => {

    return quantity > 0 ? <span className="badge badge-primary badge-pill">In Stock</span> : <span>Out of Stock</span>

  }
  return (
    <>

      <div className="card" style={{ maxHeight: "100%", maxWidth: "100%", background: "sky blue" }}  >
        <div className="card-header name" >
          {product.name}
        </div>
        <div className="card-body" style={{ margin: 'auto' }}>
          <ShowImage item={product} url="product" />
          <p className="lead mt-2">
            {product.description.substring(0, 50)}
          </p>
          <p className="black-10">
            ${product.price}
          </p>
          <p className="black-9">Category: {product.category && product.category.name}</p>
          <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>



          <div style={{ textAlign: "center" }}>
            {showStock(product.quantity)}
            <br/>
            {showViewButton(showViewProductButton)}
            {showAddToCartButton()}
          </div>

        </div>
      </div>


    </>
  )
}

export default Card;