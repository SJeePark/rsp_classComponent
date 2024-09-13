import React from 'react'

const Box = (props) => {
  return (
    <div className='box'>
      <h2>{props.name}</h2>
      <img src='https://cdn.pixabay.com/photo/2016/03/31/19/28/cut-1295044_1280.png' width={'200px'}></img>
      <p>result</p>
    </div>
  )
}

export default Box
