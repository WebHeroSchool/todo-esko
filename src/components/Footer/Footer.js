import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import styles from './Footer.module.css';
import PropTypes from 'prop-types';

const Footer = ({tasksCounter, finishedTasks}) => (
  <footer>
    <p>Активных задач: {tasksCounter}</p>
    <small>Выполненых задач: {finishedTasks}</small>

    <ButtonGroup size="small" aria-label="small outlined button group" className={styles.m10}>
      <Button>Все задачи</Button>
      <Button>Активные</Button>
      <Button>Завершённые</Button>
    </ButtonGroup>
    <Button variant="contained" color="secondary">
      Удалить выполненные
    </Button>
  </footer>
);

Footer.propTypes = {
  tasksCounter: PropTypes.number,
  finishedTasks: PropTypes.number,
}
export default Footer;
