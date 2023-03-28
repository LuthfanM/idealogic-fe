import React from 'react'

var classNames = require('classnames');

const Parents = (Props) => {
    const {children, isBorder } = Props;
      
  const insideStyle = classNames({
    flexDirection: "column", 
    alignItems: "center",
    border: isBorder? '1px solid black': '',
    padding: isBorder? '15px': ''
  })

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
    <div className={insideStyle}>
        {children}
    </div>
  </div>
  )
}

export default Parents