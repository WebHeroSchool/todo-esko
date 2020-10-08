import React from 'react';
import Item from '../Item/Item';
import styles from'./ItemList.module.css';
import PropTypes from 'prop-types'

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

ItemList.propTypes = {
  tasks: PropTypes.array,
}
export default ItemList;
