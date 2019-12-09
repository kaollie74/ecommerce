import React, { useState, useEffect } from 'react';
import { getCategories, list } from "./apiCore";
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
  const { categories, singleCategory, search, results, searched } = data;

  // runs on page load and when state changes.
  // run loadCategories on page load. 
  useEffect(() => {
    loadCategories();
  }, []) // END USE EFFECT 

  /******************************************************************** LOAD CATEGORIES */
  // run getCategories method that resides in ./apiCore
  // then run conditional.
  // if error console.log response.error
  // else use setData() method, grab all data from state
  // and set categories to the value of response. 
  const loadCategories = () => {
    getCategories()
      .then(response => {
        if (response.error) {
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
  } // END LOAD CATEGORIES

  /******************************************************************** HANDLE CHANGE */
  const handleChange = (event, propsName) => {
    console.log("IN HANDLE CHANGE: ", event.target.value)

    setData({
      ...data,
      [propsName]: event.target.value,
      searched: false,
    })
  }

  const searchProducts = (results = []) => {
    
    return (
      
        <div className="row">
          {results.map((item, i) => (
            <Card key={i} product={item} />
          ))}
        </div>
    )
  }

  const searchData = () => {
    console.log(search, singleCategory);
    let newObject = {
      search,
      singleCategory
    }
    if (search) {
      list(newObject)
        .then(response => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({
              ...data,
              results: response,
              searched: true
            })
          }
        })
    }

  } // END SEARCH DATA

  /******************************************************************** SEARCH SUBMIT */
  const searchSubmit = (event) => {

    event.preventDefault();
    searchData();
  } // END SEARCH SUBMIT

  /******************************************************************** SEARCH FORM  */
  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={(event) => handleChange(event, "singleCategory")}>
                <option value="All">Pick Category</option>
                {categories.map((item, i) => (
                  <option key={i} value={item._id} >{item.name}</option>
                ))}
              </select>
            </div>
            <input
              type="search"
              className="form-control"
              onChange={(event) => handleChange(event, "search")}
              placeholder="Search by name"
            />
          </div>
          <div className="btn input-group-append" style={{ border: "none" }}>
            <button className="input-group-text">Search</button>
          </div>
        </span>
      </form>
    )
  }// END SEARCH FORM 

  return (
    <div className="row">
      <div className="container mb-3">
        {searchForm()}
      </div>
      <div className="conatiner-fluid mb-3">
        {searchProducts(results)}
      </div>
    </div>
  )
} // END SEARCH

export default Search; 