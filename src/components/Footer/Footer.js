import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import styles from './Footer.module.css';
import PropTypes from 'prop-types';

const Footer = ({activeCounter, finishedTasks}) => (
  <footer>
    <p>Активных задач: {activeCounter}</p>
    <p><small>Выполненых задач: {finishedTasks}</small></p>

    <ButtonGroup size='small' aria-label='small outlined button group' className={styles.m10}>
      <Button>Все задачи</Button>
      <Button>Активные</Button>
      <Button>Завершённые</Button>
    </ButtonGroup>
    <Button variant='contained' color='secondary'>
      Удалить выполненные
    </Button>
  </footer>
);

Footer.propTypes = {
  activeCounter: PropTypes.number,
  finishedTasks: PropTypes.number,
}

Footer.defaultProps = {
  activeCounter: 1,
  finishedTasks: 0,
}

export default Footer;
