import React, { useState, useEffect } from 'react';

const Checkbox = ({ categories }) => {

  const [checked, setChecked] = useState([])

  const handleToggle = (id) => {

    // check if id exist in the checked array
    // if not found it will return -1
    const currentCategoryId = checked.indexOf(id)
    // grabs the values from checked state
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state then we push()
    // else we will remove()

    if (currentCategoryId === -1) {
      // push into the newCheckedCategoryId Array
      newCheckedCategoryId.push(id);

    } else {

      //remove from newCheckedCategoryid Array
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }

    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
  }

  return (

    categories.map((item, i) => (

      <li className="list-unstyled" key={i}>
        <input
          onChange={() => handleToggle(item._id)}
          value={checked.indexOf(categories._id === -1)}

          type="checkbox"
          className="form-check-input"
        />
        <label className="form-check-label">{item.name}</label>
      </li>
    ))






  )


}

export default Checkbox