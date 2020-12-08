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
  approveTask,
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
  <div>
    {(tasks.length !== 0) && <ul className={styles.itemList}>
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
          approveTask={approveTask}
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
    </ul>}

    {(tasks.length === 0) && <p>Задач нет, но ты можешь их добавить!</p>}
  </div>
);


Item.propTypes = {
  tasks: PropTypes.array,
}

export default ItemList;
