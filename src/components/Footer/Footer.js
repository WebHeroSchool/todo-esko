import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PropTypes from 'prop-types';

const Footer = ({
  activeCounter,
  finishedTasks,
  showAll,
  showActive,
  showFinished,
  deleteFinished,
  filter}) => (
    <footer>
      <ButtonGroup size='small' aria-label='small outlined button group' style={{margin: '10px 0'}}>
        <Button
          variant={(filter === 'all') ? 'contained' : 'outlined'}
          onClick={showAll}
        >
          Все задачи ({activeCounter + finishedTasks})
        </Button>
        <Button 
          variant={(filter === 'active') ? 'contained' : 'outlined'}
          onClick={showActive}
        >
          Активные ({activeCounter})
        </Button>
        <Button
          variant={(filter === 'finished') ? 'contained' : 'outlined'}
          onClick={showFinished}
        >
          Завершённые ({finishedTasks})
        </Button>
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
