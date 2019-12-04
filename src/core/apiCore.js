import React from 'react';
import Axios from 'axios';


export const getProducts = (sortBy) => {

  return Axios.get(`/api/products?sortBy=${sortBy}&order=desc&limit=6`)
  .then(response =>{
    console.log(response.data)
    return response.data
  })
  .catch(error => {
    console.log(error);

  })
}