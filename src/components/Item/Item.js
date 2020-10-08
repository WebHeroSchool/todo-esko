import React from 'react';
import styles from'./Item.module.css';
import Checkbox from '@material-ui/core/Checkbox';
import classnames from 'classnames';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Item = ({value, isDone, onClickDone}) => (
  <li
    className={styles.container}
  >
    <Checkbox
        checked={isDone}
        color="default"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
        onClick = { () => onClickDone(isDone) }
      />
    <p className={
      classnames({
        [styles.item]: true,
        [styles.done]: isDone,
      })
    }
    onClick = { () => onClickDone(isDone) }>{value}</p>
    <DeleteForeverIcon className={styles.deleteBtn}></DeleteForeverIcon>
  </li>
);

export default Item;
