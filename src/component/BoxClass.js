import React, { Component } from 'react';

class Box extends Component {
  render() {
    const { name, item, result, borderColor } = this.props;

    return (
      <div className='box' style={{ borderColor: borderColor }}>
        <h2>{name}</h2>
        <img src={item && item.img} width={'200px'} alt={`${name} choice`} />
        <p>{result}</p>
      </div>
    );
  }
}

export default Box;
