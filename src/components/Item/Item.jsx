import { useState, useEffect } from 'react';
import './Item.scss';

const Item = () => {
  return (
    <div className="item-container">
      <div className="item">
        <p>Item name</p>
      </div>
      <div className="purchasing-price">
        <p>Purchasing price</p>
      </div>
      <div className="selling-price">
        <p>Selling price</p>
      </div>
      <div className="profit">
        <p>Profit</p>
      </div>
      <div className="options">
        <p>Edit/delete options</p>
      </div>
    </div>
  );
};

export default Item;
