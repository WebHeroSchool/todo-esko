import React from 'react';
import styles from'./Item.module.css';
import Checkbox from '@material-ui/core/Checkbox';
import classnames from 'classnames';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Item = ({value, isDone, onClickDone, id, deleteTask}) => (
  <li
    className={styles.container}
  >
    <Checkbox
        checked={isDone}
        color='default'
        inputProps={{ 'aria-label': 'checkbox with default color' }}
        onClick = { () => onClickDone(id) }
      />
    <p className={
      classnames({
        [styles.item]: true,
        [styles.done]: isDone,
      })
    }
    onClick = { () => onClickDone(id) }>{value}</p>
    <DeleteForeverIcon
      className={styles.deleteBtn}
      onClick = { () => deleteTask(id) }
    ></DeleteForeverIcon>
  </li>
);

Item.defaultProps={  //без передачи задач из стейта вся логика ломается, но хоть не пустое окно остаётся
  value: 'Обязательно! Задебажить передачу пропсов',
  isDone: false,
  id: 1,
}

export default Item;
