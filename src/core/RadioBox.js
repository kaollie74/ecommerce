import React, { useState, useEffect, Fragment } from 'react';

const RadioBox = ({ prices, handleFilters }) => {

  //STATE
  const [value, setValue] = useState(0);

  const handleChange = (id) => {
   handleFilters(id);
   setValue(id);

  }

  return (

    prices.map((item, i) => (

      <div key={item._id}>
        <input
          type="radio"
          className="mr-2 ml-4"
          name={item}
          onChange={() => handleChange(item._id)}
          value={`${item._id}`}
        />

        <label className="form-check-label">{item.name}</label>
      </div>
    ))



  )

}

export default RadioBox;
