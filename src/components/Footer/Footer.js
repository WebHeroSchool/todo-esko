import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import styles from './Footer.module.css';

const Footer = ({tasksCounter}) => (
  <footer>
    <p>Активных задач: {tasksCounter}</p>

    <ButtonGroup size="small" aria-label="small outlined button group" className={styles.mb10}>
      <Button>Все задачи</Button>
      <Button>Активные</Button>
      <Button>Завершённые</Button>
    </ButtonGroup>
    <Button variant="contained" color="secondary">
      Удалить выполненные
    </Button>
  </footer>
);

export default Footer;
