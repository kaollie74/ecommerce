import React from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from './apiCore';

const Card = ({ productSold, productArrival }) => {

  return (
    <>
      <div className="col-4 mb-3"  >
        <div className="card"  >
          <div className="card-header" style={{ backgroundColor: "black", color: "white" }}>
            {productSold.name}
          </div>
          <div style={{ margin: 'auto' }}>
            <div style={{ display: "inline-flex" }}>
              <p>{productSold.description}</p>
              <p>${productSold.price}</p>
            </div>
            <div>
              <Link to="/"></Link>
              <button className="btn btn-outline-primary mt-2 mb-2"> View Product</button>
              <button className="btn btn-outline-danger mt-2 mb-2"> Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Card;