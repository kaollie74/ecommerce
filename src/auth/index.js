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

export const signin = (email, password) => {

  //console.log("in signin: ", name, email, password);

  // newObject will be set to server 
  let newObject = {
    email: email,
    password: password
  }

  // send Axios.post to server to sign new user up
  return Axios.post('/api/signin', newObject)

    .then(response => {
      console.log(response)
      return response
    })// end then
    .catch(error => {
      console.log(error);
      return error

    })// end catch

} // END signUp

export const authenticate = (data, callBack) => {

  if( typeof window !== "undefined"){
    // use method setItem to store local storage on browser
    // first argument is the 'key' or what we will call it on the browser, 
    // second argument is what you want to store.
    // In this case, it will be the data we get back from the server.
    localStorage.setItem("jwt", JSON.stringify(data) )
    callBack();
  }
}