import Axios from 'axios';

export const createCategory = (categoryData) => {
   const { _id, token, name }  = categoryData;

   let config = {
    headers: {'Authorization': "bearer " + token}
};
  console.log(categoryData._id);


  return Axios.post(`/api/category/create/${_id}`, {name}, config)
  .then( response => {
    console.log(response.data);
    return response.data;
  })
  .catch(error => {
    return console.log(error);
  })
} // END CREATE CATEGORY

/**************************************************************************************** CREATE PRODUCT ****************** */
export const createProduct = (_id, token, product) => {

  // console.log(productData);
  //  const { _id, token, newFormData }  = productData;

   let config = {
    headers: {'Authorization': "bearer " + token }
};
  console.log(product);

  return Axios.post(`/api/product/create/${_id}`, product, config)
  .then( response => {
    console.log(response);
    return response.data;
  })
  .catch(error => {
     console.log(error);

  })

  // return fetch(`http://localhost:5000/product/create/${_id}`, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     Authorization: `Bearer ${token}`
  //   },
  //   body: product
  // })
  // // .then(response => {
  // //   return response.json()
  // // })
  // .then(res => res.text())         
  // .then(text => console.log(text))
  // .catch( error => {
  //   console.log("This is error: ", error);
  // })

} // END CREATE CATEGORY

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

