import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import Card from './Card';
import { getCategories } from "./apiCore";
import Checkbox from "./Checkbox"
import RadioBox from "./RadioBox.js";
import { prices } from "./FixedPrices";



const Shop = () => {

  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  })
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    init();
  }, [])

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

  // filters argument will be the array of categories and/or price range
  // filterBy argument will be either by category or price
  // conditional will run if filterBy === price which will pass the filters
  //argment into the handlePrice method. 
  const handleFilters = (filters, filterBy) => {
    console.log("in HandleFilters", filters, filterBy)

    const newFilters = { ...myFilters }
    newFilters.filters[filterBy] = filters;
    if(filterBy === 'price') {
      let priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues;
    }
    setMyFilters(newFilters);

  }

  // grab 'prices' object array from ./FixedPrices file and set to data variable.
  // set another array variable to empty [].
  //The value argument is an 'id' number that resides in the prices object.
  // we want the array key value to send to the back end.
  // for in loop to match the key value to the value argument passed into function.
  // if there is a match, set the array variable to the value of the array key.
  // return array variable. 
  const handlePrice = (value) =>{
    const data = prices; 
    let array = []

    for ( let key in data ) {
      if( data[key]._id === parseInt(value)) {
        //array.push(data[key].array);
        array = data[key].array;
      }
    }

    console.log("handlePrice: ", array);
    return array;

  }

  return (
    <>
      <Layout
        title="Shop Page"
        description="Search and find books of your choice"
        className="container-fluid"
      ></Layout>
      <div className="row">
        <div className="col-4">
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
        <div className="col-8">
          

        </div>
      </div>
      {JSON.stringify(myFilters)}
    </>

  )


}// END SHOP

export default Shop;

