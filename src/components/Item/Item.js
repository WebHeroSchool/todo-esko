import React from 'react';
import styles from'./Item.module.css';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import classnames from 'classnames';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PropTypes from 'prop-types';

const Item = ({itemValue, isDone, isEditing, onClickDone, id, deleteTask, editTask, tempValue, setTempValue, aproveTask}) => {

  if (isEditing) {
    return (
      <li className={styles.container}
        onMouseLeave={ () => aproveTask(id, tempValue) }
        onKeyPress={ (e) => {
          if (e.key === 'Enter') {
            aproveTask(id, tempValue)
          }
         }
        }>
        <TextField
          id='standard-basic'
          size='small'
          fullWidth
          value={tempValue}
          onChange={evt => {
            setTempValue(evt.target.value)
          }
        }
        />
      </li>
    )
  } else {
    return (
      <li className={styles.container} onDoubleClick={ () => editTask(id, itemValue) }>
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
        onClick = { () => onClickDone(id) }>
          {itemValue}
        </p>
        <DeleteForeverIcon
          className={styles.deleteBtn}
          onClick = { () => deleteTask(id) }
        />
      </li>
    )
  }
}

Item.propTypes = {
  id: PropTypes.number,
  value: PropTypes.string,
  isDone: PropTypes.bool,
}

export default Item;
