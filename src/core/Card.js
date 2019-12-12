import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getProducts } from './apiCore';
import ShowImage from './ShowImage';
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";


const Card = ({
  product,
  run = undefined,
  setRun = f => f,
  showViewProductButton = true,
  showAddToCartButtonCondition = true,
  cartUpdate = false,
  showRemoveProductButton = false }) => {

  // STATE
  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count);

  // useEffect(() => {
  //   setItems(getCart());
  // }, [run]);

  /******************************************************************************** SHOW VIEW BUTTON **************************** */

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

  /******************************************************************************** ADD TO CART **************************** */

  const addToCart = () => {
    // "product" is passed through props from parents components,
    // its globally accessible. 
    // 
    addItem(product, () => {
      setRedirect(true);
    })
  }

  /******************************************************************************** HANDLE CHANGE **************************** */
  const handleChange = (event, productId) => {

    // use ternary to prevent any negative values. 
    setCount(event.target.value < 1 ? 1 : event.target.value);
    // if event.target.valu is greater than 0 that use update() method
    // that resides in ./cartHelpers.js file
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value) // method in api to update
    }
  }

  /******************************************************************************** SHOW CART UPDATE OPTIONS **************************** */

  const showCartUpdateOptions = (cartUpdate) => {

    if (cartUpdate) {
      return (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={(event) => handleChange(event, product._id)} />
          </div>
        </div>
      )
    }

  }

  /******************************************************************************** SHOULD REDIRECT **************************** */

  const shouldRedirect = redirect => {

    if (redirect) {
      return <Redirect to="/cart"></Redirect>
    }
  }
  /******************************************************************************** SHOW REMOVE BUTTON **************************** */
  const showRemoveButton = (showRemoveProductButton) => {

    if (showRemoveProductButton) {
      return <button onClick={() => removeItem(product._id)} className="btn btn-outline-danger mt-2 mb-2"> Remove Product</button>
    }
  }

  /******************************************************************************** SHOW ADD TO CART BUTTON**************************** */

  const showAddToCartButton = () => {

    if (showAddToCartButtonCondition) {
      return <button onClick={addToCart} className="btn btn-outline-danger mt-2 mb-2"> Add to Cart</button>
    }
  }

  /******************************************************************************** SHOW STOCK **************************** */

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
          {shouldRedirect(redirect)}
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
            <br />
            {showViewButton(showViewProductButton)}
            {showRemoveButton(showRemoveProductButton)}
            {showAddToCartButton(showAddToCartButtonCondition)}
            {showCartUpdateOptions(cartUpdate)}

          </div>

        </div>
      </div>


    </>
  )
}

export default Card;