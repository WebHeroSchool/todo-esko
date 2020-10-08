import React from 'react';
import styles from'./Item.module.css';
import Checkbox from '@material-ui/core/Checkbox';
import classnames from 'classnames';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PropTypes from 'prop-types';

class Item extends React.Component {

  componentDidMount() {
    this.timerID = setInterval(() => console.log('+1 sec'), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  render() {
    const {value, isDone, onClickDone, id, deleteTask} = this.props;

    return (
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
    )
  }
}

Item.propTypes = {
  id: PropTypes.number,
  value: PropTypes.string,
  isDone: PropTypes.bool,
}

Item.defaultProps={  //без передачи задач из стейта вся логика ломается, но хоть не пустое окно остаётся
  value: 'Обязательно! Задебажить передачу пропсов',
  isDone: false,
  id: 1,
}

export default Item;
