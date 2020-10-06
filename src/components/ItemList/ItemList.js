import React from 'react';
import Item from '../Item/Item';
import styles from'./ItemList.module.css';

const ItemList = ({tasks, onClickDone, deleteTask}) => ( <ul className={styles.itemList}>
  {tasks.map( (task) =>
    <Item
      key={task.value} 
      value={task.value}
      isDone={task.isDone}
      id={task.id}
      onClickDone={onClickDone}
      deleteTask={deleteTask}
    />)}
  </ul>
);

ItemList.defaultProps = { //без передачи задач из стейта вся логика ломается, но хоть не пустое окно остаётся
  tasks: [{
    value: 
      `Кстати говоря, я ж так и не дошёл до того, чтобы посмотреть, как будут отображаться длинные строки, всё ли будет ок, либо же найдутся недостатки?)
      P.S. Иконка корзины двигала текст при появлении, теперь пофиксил)
      P.P.S. Если видите этот текст, то стоит подебажить пропсы)
      `,
    isDone: false,
    id: 1,
  }]
}

export default ItemList;
