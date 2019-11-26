import Axios from 'axios';

export const signUp = (name, email, password) => {

  //console.log("in signUP: ", name, email, password);

  // newObject will be set to server 
  let newObject = {
    name: name,
    email: email,
    password: password
  }

  // send Axios.post to server to sign new user up
  return Axios.post('/api/signup', newObject)

    .then(response => {
      console.log(response)
      return response
    })// end then
    .catch(error => {
      console.log(error);
      return error

    })// end catch

} // END signUp