import React from 'react';
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Todo from '../Todo/Todo';
import About from '../About/About';
import Contacts from '../Contacts/Contacts';
import styles from './App.module.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'; 

const App = () => {
  return (
    <Router>
      <div className={styles.wrapper}>
        <Card className={styles.sidebar}>
          <MenuList>
            <Link to='/' className={styles.link}><MenuItem>Обо мне</MenuItem></Link>
            <Link to='/todo' className={styles.link}><MenuItem>Задачи</MenuItem></Link>
            <Link to='/contacts' className={styles.link}><MenuItem>Контакты</MenuItem></Link>
          </MenuList>
        </Card>

        <Card className={styles.content}>
          <Route path='/' exact component={About} />
          <Route path='/todo' component={Todo} />
          <Route path='/contacts' component={Contacts} />
        </Card>
      </div>
    </Router>
  );
}

export default App;
