import React from 'react';



const ShowImage = ({ item, url }) => {

  return <div className="product-img">
    <img src={`/api/${url}/photo/${item._id}`} alt={item.name} style={{maxHeight: "360px", maxWidth: "290px"}}  className="mb-3"/>
  </div>


} // END SHOW IMAGE

export default ShowImage;