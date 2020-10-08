import React from 'react';
import styles from'./Item.module.css';
import Checkbox from '@material-ui/core/Checkbox';
import classnames from 'classnames';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PropTypes from 'prop-types'

const Item = ({value, isDone, onClickDone, id, deleteTask}) => (
  <li
    className={styles.container}
  >
    <Checkbox
        checked={isDone}
        color="default"
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

Item.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
}

export default Item;
