import React from 'react'
import Menu from "./Menu";
import '../style.css';

// this is a layout Component that will take props and then organize the layout based on this
// layout template. This can be used througout the front-end.
const Layout = ({ title = "Title", description = "Description", className, children }) => {
  return (
    <>
      <Menu/>
      <div className="jumbotron">

        <div>
          <h2>{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
    </>
  )
}

export default Layout; 