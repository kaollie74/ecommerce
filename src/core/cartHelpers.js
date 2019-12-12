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

// update specific product by passing its id and the count we want to update with
// as the argument.
// grab local storage and set new cart variable to the products that exist in the browser.
// that map through car and compare the product._id to the productId that is passed in as the argument
// if matched, that updated that specific product count with the new count argument. 
// then setItem to localStorage with new updated cart. 
export const updateItem = (productId, count) => {
  console.log("IN UPDATE ITEM: ", productId, count);
  const product2Id = JSON.stringify(productId);
  console.log("productId: ", product2Id);
  let cart = [];

  if(typeof window !== "undefined") {
    if(localStorage.getItem("cart")){
      
      cart = JSON.parse(localStorage.getItem("cart"))
    }
    cart.map((item, i) => {
      //console.log("item: ", item);
      if(item._id === productId) {
        //console.log("item id: ", item._id)
        console.log(cart[i]);
        cart[i].count = count;
      }
    })
    //console.log("cart: ", cart)
    localStorage.setItem("cart", JSON.stringify(cart)); 
  }

} // END UPDATE ITEM 

/************************************************************************ REMOVE ITEM */
export const removeItem = (productId) => {

  console.log("IN REMOVE ITEM: ", productId);

  // declare cart variable to empty Array; 
  let cart = [];

  if(typeof window !== "undefined") {
    if(localStorage.getItem("cart")){
      
      cart = JSON.parse(localStorage.getItem("cart"))
    }

    // map through cart array.
    // if the item._id matches the productId that is passed in
    // as an agrument, then splice that item out of the array.
    cart.map((item, i) => {
      //console.log("item: ", item);
      if(item._id === productId) {
        //console.log("item id: ", item._id)
        console.log(cart[i]);

        //splice() method
        // 1st argument is where the splice should start.
        // 2nd argument is how many should be removed once it 
        // begins. 
        cart.splice(i , 1); 
      }
    })
    // set local storage to the browser with new cart array. 
    localStorage.setItem("cart", JSON.stringify(cart)); 
  }

  return cart;

} // END REMOVE ITEM 
