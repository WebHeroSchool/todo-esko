import React from 'react';
import styles from'./Item.module.css';
import Checkbox from '@material-ui/core/Checkbox';
import classnames from 'classnames';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Item = ({value, isDone}) => (
  <li className={styles.container}>
    <Checkbox
        defaultChecked
        color="default"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
      />
    <p className={
      classnames({
        [styles.item]: true,
        [styles.done]: isDone,
      })
    }>{value}</p>
    <DeleteForeverIcon className={styles.deleteBtn}></DeleteForeverIcon>
  </li>
);

export default Item;
