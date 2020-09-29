import React from 'react';
import Item from '../Item/Item';
import './ItemList.css';

const ItemList = ({tasks}) => ( <ol>
  {tasks.map( (task) => <Item key={task.value} value={task.value} isDone={task.isDone}/>)}
  </ol>
);

export default ItemList;
