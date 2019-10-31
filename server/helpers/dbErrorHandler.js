"use strict";

/**
 * Get unique error field name
 */
const uniqueMessage = error => {
  console.log('IN UNIQUE MESSAGE FUNCTION: ', error.errmsg);
  let output = '';
  let newError = error.errmsg;
  try {
    let fieldName = newError.substring(
      newError.lastIndexOf(".$") + 2,
      newError.lastIndexOf("_1")
    );
    console.log('This is fieldName variable: ', fieldName);
    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " already exists";
      console.log('This is output variable: ', output);
  } catch (ex) {
    output = "Unique field already exists";
  }

  return output;
};


/* this runs first within file.
 the argument is passed into conditional
 then into a switch statement.
 if true and one of the cases(11000 || 110001) is met,
 then the error is passed as an argument into the 'uniquMessage'
 function. 
 */
const errorHandler = error => {
  let message = "";

  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(error);
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (let errorName in error.errorors) {
      if (error.errorors[errorName].message)
        message = error.errorors[errorName].message;
    }
  }

  return message;
};

module.exports = { errorHandler };