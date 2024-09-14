import React from 'react';

const Box = (props) => {
  console.log('p', props);
  return (
    <div className='box' style={{ borderColor: props.borderColor }}>
      <h2>{props.name}</h2>
      <img src={props.item && props.item.img} width={'200px'}></img>
      <p>{props.result}</p>
    </div>
  )
}

export default Box
