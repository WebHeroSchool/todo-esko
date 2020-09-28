import React from 'react';
import Item from '../Item/Item';
import './ItemList.css';

const ItemList = ({tasks}) => (
  <ol>
    <Item task={tasks[0]}/>
    <Item task={tasks[1]}/>
    <Item task={tasks[2]}/>
  </ol>
);

export default ItemList;
