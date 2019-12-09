import React from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from './apiCore';
import ShowImage from './ShowImage';

const Card = ({ product }) => {

  return (
    <>
      <div className="col-4 mb-3"  >
        <div className="card"  >
          <div className="card-header" style={{ backgroundColor: "black", color: "white" }}>
            {product.name}
          </div>
          <div className="card-body" style={{ margin: 'auto' }}>
            <ShowImage item={product} url="product" />
            <p>{product.description.substring(0, 50)}</p>
            <p>${product.price}</p>
            <Link to="/"></Link>
            <button className="btn btn-outline-primary mt-2 mb-2 mr-2"> View Product</button>
            <button className="btn btn-outline-danger mt-2 mb-2"> Add to Cart</button>

          </div>
        </div>
      </div>

    </>
  )
}

export default Card;