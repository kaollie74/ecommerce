import React, { useState, useEffect } from 'react';
import { getCategories } from "./apiCore";
import Card from "./Card";

const Search = () => {

  //STATE 
  const [data, setData] = useState({
    categories: [],
    singleCategory: '',
    search: '',
    results: [],
    searched: false,

  })

  // destructure state
  const { categories, singleCategory, search, results, searched} = data;

  // runs on page load and when state changes.
  // run loadCategories on page load. 
  useEffect( () => {
    loadCategories();
  }, [])

  // run getCategories method that resides in ./apiCore
  // then run conditional.
  // if error console.log response.error
  // else use setData() method, grab all data from state
  // and set categories to the value of response. 
  const loadCategories = () => {
    getCategories()
    .then( response => {
      if(response.error) {
        console.log(response.error);
      } else {
        setData({
          ...data,
          categories: response
        })
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div>
      <h2>Search Bar </h2>
      {JSON.stringify(categories)}
    </div>
  )
} // END SEARCH

export default Search; 