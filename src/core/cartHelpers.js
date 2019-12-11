// item will ge the product
// next will be the callback function
export const addItem = (item, next) => {

  let cart = [];
  if( typeof window !== "undefined") {
    // if we have the "cart" in the local storage
    if(localStorage.getItem("cart")) {
      // JSON.parse() to convert json to object
      // JSON.stringify() to convert object ot json
      cart = JSON.parse(localStorage.getItem("cart"))
    }
    cart.push({
      ...item,
      count: 1 // be default it will always be 1

    })

    // Array.from() will create a new array
    // new Set() will remove the dubplicates
    // remove duplicates
    // build an Array from new Set and turn it bak int array using Array.from()
    // so that late we can re-map it
    // New set will only allow unique values in it
    // so pass the ids of each object/product
    // If the loop tries to add the same value again, it'll get ignored
    // ...with the array of ids we got on when first map() was used
    // run map() on it agian and return the actual product from the cart
    cart = Array.from(new Set(cart.map( (p) => (p._id)))).map(id => {
      return cart.find(p => p._id === id)
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }

}

// check if window is not undefined
// get "cart" from localStorage, which exists in the browser
// return the length for the array which indicates how many is in the cart
// else return 0.
export const itemTotal = () =>{

  if(typeof window !== "undefined") {
    if(localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length
    }
  }
  return 0;
}

// get all the items in the cart
export const getCart = () => {
  if (typeof  window !== "undefined") {
    if(localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"))
    }
  }
  return [];
}