import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import { getCart } from "./cartHelpers";
import Card from './Card';
import { Link } from "react-router-dom";

const Cart = () => {

  // STATE
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(getCart())
  }, [])

  const showItems = (items) => {
    return (
      <div className="">
        <h1>Your cart has {`${items.length}`} items </h1>
        <hr />
        {items.map((item, i) => (
          <Card product={item} key={i} showAddToCartButtonCondition = {false} />
        ))}
      </div>
    )
  }

  const noItemsMessage = () => {
    return (
      <>
        <h1>Your cart is empty</h1>
        <br />
        <Link to="/shop">Continue Shopping</Link>
      </>

    )
  }



  return (
    <>
      <Layout title="Shopping Cart" description={`you have ${items.length} items in your cart`}></Layout>

      <div className="row">
        <div className="col-6">
        {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <p>Show checkout options/shipping address/total/update quantity</p>
        </div>
      </div>
    </>
  )


} // END CART 

export default Cart;
