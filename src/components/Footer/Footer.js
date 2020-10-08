import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import styles from './Footer.module.css';

const Footer = ({tasksCounter, finishedTasks}) => (
  <footer>
    <p>Активных задач: {tasksCounter}</p>
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

export default Footer;
