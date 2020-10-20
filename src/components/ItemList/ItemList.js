import React from 'react';
import Item from '../Item/Item';
import styles from'./ItemList.module.css';
import PropTypes from 'prop-types';

const ItemList = ({
  tasks,
  onClickDone,
  deleteTask,
  editTask,
  tempValue,
  setTempValue,
  aproveTask,
  editingError,
  errorMessage,
  setError,
  setErrorMessage,
  onDragStart,
  onDragOver,
  onDrop,
  onDragLeave,
  dragAndDrop,
}) => ( 
  <ul className={styles.itemList}>
    {tasks.map( (task, index) =>
      task.isVisible && <Item
        key={task.id} 
        itemValue={task.value}
        isDone={task.isDone}
        isEditing={task.isEditing}
        id={task.id}
        onClickDone={onClickDone}
        deleteTask={deleteTask}
        editTask={editTask}
        tempValue={tempValue}
        setTempValue={setTempValue}
        aproveTask={aproveTask}
        editingError={editingError}
        errorMessage={errorMessage}
        setError={setError}
        setErrorMessage={setErrorMessage}
        index={index}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
        dragAndDrop={dragAndDrop}
      />
    )}
  </ul>
);


Item.propTypes = {
  tasks: PropTypes.array,
}

export default ItemList;
