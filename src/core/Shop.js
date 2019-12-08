import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox"
import RadioBox from "./RadioBox.js";
import { prices } from "./FixedPrices";





const Shop = () => {


  // STATE
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  })
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(false)
  const [limit, setLimit] = useState(6)
  const [skip, setSkip] = useState(0)
  const [size, setSize] = useState(0);

  const [filteredResults, setFilteredResults] = useState([])

  // Runs on page load and when state changes
  useEffect(() => {
    init();
    loadFitlerResults(skip, limit, myFilters.filters);
  }, [])

 /************************************************************************** INIT */
 // run getCategories method which runs in ./apiCore file
 // once response comes back from server, if it is error, set response.error to error state
 // else set the response, which is categories, to categories state
  const init = () => {
    getCategories()
      .then(response => {
        console.log(response);
        if (response.errors) {
          setError(response.errors)
        } else {
          setCategories(response);
        }
      })
  } // END INIT

 /************************************************************************** LOAD FILTER RESULTS */
// Run getFilteredProducts method that resides in ./apiCore
// the method has 3 arguments: skip and limit are set in state.
// newFilters is passed in from the "handleFilters" method
// if response comes back error set error to response
// else setFilteredResults to the response
// setSize to response.size
// setSkip to 0
  const loadFitlerResults = (newFilters) => {
    console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters)
      .then(response => {
        if (response.error) {
          setError(response.error);
        } else {
          console.log(response.data);
          setFilteredResults(response.data);
          setSize(response.size);
          setSkip(0);
        }
      })
      .catch(error => {
        console.log(error);
      })
    //console.log(getFilteredProducts);
  }

  /***************************************************************************** LOAD MORE */
  const loadMore = (newFilters) => {

    let toSkip = skip + limit;
    console.log(newFilters);
    getFilteredProducts(toSkip, limit, myFilters.filters)
      .then(response => {
        if (response.error) {
          setError(response.error);
        } else {
          console.log(response.data);
          setFilteredResults([...filteredResults, ...response.data]);
          setSize(response.size);
          setSkip(toSkip);
        }
      })
      .catch(error => {
        console.log(error);
      })
    //console.log(getFilteredProducts);
  }
  // if size state variable is greater than 0 or greater than or equal to the limit
  // state variable, then return a button
  // this will allow the user to load more products onto the page.
  const loadMoreButton = () => {

    if (size > 0 && size >= limit) {
      return <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>
    }
 
  } // END LOAD MORE BUTTON

  // filters argument will be the array of categories and/or price range
  // filterBy argument will be either by category or price
  // conditional will run if filterBy === price which will pass the filters
  //argment into the handlePrice method. 
  const handleFilters = (filters, filterBy) => {
    console.log("in HandleFilters", filters, filterBy)

    const newFilters = { ...myFilters }
    newFilters.filters[filterBy] = filters;
    if (filterBy === 'price') {
      let priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues;
    }
    loadFitlerResults(myFilters.filters);
    setMyFilters(newFilters);

  } // END HANDLE FILTERS

  // grab 'prices' object array from ./FixedPrices file and set to data variable.
  // set another array variable to empty [].
  //The value argument is an 'id' number that resides in the prices object.
  // we want the array key value to send to the back end.
  // for in loop to match the key value to the value argument passed into function.
  // if there is a match, set the array variable to the value of the array key.
  // return array variable. 
  const handlePrice = (value) => {
    const data = prices;
    let array = []

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        //array.push(data[key].array);
        array = data[key].array;
      }
    }

    //console.log("handlePrice: ", array);
    return array;

  } // END HANDLE PRICE



  return (
    <>
      <Layout
        title="Shop Page"
        description="Search and find books of your choice"
        className="container-fluid"
      > </Layout>
      <div className="row">
        <div className="col-2">
          <h4>Filter By Categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={filters => handleFilters(filters, "category")}
            />
          </ul>
          <h4>Filter By Price</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={filters => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-10">
          <h2 className="mb-4">Products</h2>
          <div className="row">

            {filteredResults.map((item, i) => {
              return (

                <Card key={i} product={item} />

              )
            })}
            <hr />
            {JSON.stringify(size)}
            {loadMoreButton()}


          </div>
        </div>
      </div>

    </>

  )


}// END SHOP

export default Shop;

