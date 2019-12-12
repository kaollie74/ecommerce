import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import { getCart} from "./cartHelpers";
import Card from './Card';
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

const Cart = () => {

  // STATE
  const [items, setItems] = useState([])
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart())
  }, [])// >>>>>> items suppose to go here but an infinit loop is happening.

  const showItems = (items) => {
    return (
      <div className="">
        <h1>Your cart has {`${items.length}`} items </h1>
        <hr />
        {items.map((item, i) => (
          <Card 
          product={item} 
          key={i} 
          showAddToCartButtonCondition = {false} 
          cartUpdate={true} 
          showRemoveProductButton = {true}
          setRun={setRun}
          run={run}
          />
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
          <h1 className="mb-4">Your Cart Summary</h1>
          <hr/>
          <Checkout products={items}/>
        </div>
      </div>
    </>
  )


} // END CART 

export default Cart;
