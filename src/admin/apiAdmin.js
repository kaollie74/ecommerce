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
}