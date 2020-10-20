import React from 'react';
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Logo from './../../icons/SchoolLogo.png';
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
      <a href="https://webheroschool.ru/" target='blank' className={styles.bottomLink}>Сделано в <img src={Logo} width='100px' style={{marginLeft: '5px'}} alt="WebHero Schol"/></a>
    </Router>
  );
}

export default App;
