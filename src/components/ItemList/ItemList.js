import React from 'react';
import Item from '../Item/Item';
import styles from'./ItemList.module.css';

const ItemList = ({tasks, onClickDone, deleteTask}) => ( <ul className={styles.itemList}>
  {tasks.map( (task) =>
    <Item
      key={task.value} 
      value={task.value}
      isDone={task.isDone}
      onClickDone={onClickDone}
      deleteTask={deleteTask}
      id={task.id}
    />)}
  </ul>
);

export default ItemList;
