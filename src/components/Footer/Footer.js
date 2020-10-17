import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import styles from './Footer.module.css';
import PropTypes from 'prop-types';

const Footer = ({
  activeCounter,
  finishedTasks,
  showAll,
  showActive,
  showFinished,
  deleteFinished}) => (
    <footer>
      <ButtonGroup size='small' aria-label='small outlined button group' className={styles.m10}>
        <Button onClick={showAll}>Все задачи ({activeCounter + finishedTasks})</Button>
        <Button onClick={showActive}>Активные ({activeCounter})</Button>
        <Button onClick={showFinished}>Завершённые ({finishedTasks})</Button>
      </ButtonGroup>
      <Button variant='contained' color='primary' onClick={deleteFinished}>
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
