import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import { Link } from "react-router-dom";
import { getProducts } from "./apiCore";
import Card from './Card';
import { isAuth } from "../auth/index"

const Checkout = ({ products }) => {



  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0)
  }
  return (
    <div>
      <h1>Total: ${getTotal()} </h1>

      {isAuth() ? (
        <button className="btn btn-success">Checkout</button>
      ) : (
          <Link to="/signin">
            <button className="btn btn-primary">please sign in</button>

          </Link>
        )}
    </div>
  )

}

export default Checkout;