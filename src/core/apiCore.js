import React from 'react';
import Axios from 'axios';
import queryString from "query-string";


/*************************************************************************** GET PRODUCTS *************** */

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

/*************************************************************************** GET CATEGORIES *************** */

export const getCategories = () => {

  return Axios.get(`/api/category`)

  .then( response => {
    console.log(response.data)
    return response.data
  })

  .catch(error => {
    console.log(error);
  })

}// END GET CATEGORIES 

/*************************************************************************** GET FILTERED PRODUCTS *************** */
export const getFilteredProducts = (skip, limit, filters = {}) => {

  const data = {
    limit, 
    skip,
    filters
  }
  return Axios.post('/api/products/by/search', data )
  .then( response => {
    console.log(response.data);
    return response.data;
  })
  .catch(error => {
    console.log(error)
  })
} // END GET FILTERED PRODUCTS

/*************************************************************************** LIST *************** */
 // utilize queryString.stringify() to best params in to api request.
 // queryString is a package that is installed 'query-string' to make this happend
export const list = (params) => {

  const query = queryString.stringify(params)
  console.log(query);

  return Axios.get(`/api/products/search?${query}`)
  .then( response => {
    console.log(response.data);
    return response.data;
  })
  .catch( error => {
    console.log(error);
  })
}