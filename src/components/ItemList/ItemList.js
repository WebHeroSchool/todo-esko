import React from 'react';
import Item from '../Item/Item';
import styles from'./ItemList.module.css';

const ItemList = ({tasks}) => ( <ul className={styles.itemList}>
  {tasks.map( (task) => <Item key={task.value} value={task.value} isDone={task.isDone} />)}
  </ul>
);

export default ItemList;
