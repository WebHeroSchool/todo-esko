import React from 'react';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Footer from '../Footer/Footer';
import styles from './App.module.css';

const tasks = [
  {
    value: 'Разобраться с props-ми'
  },
  {
    value: 'Впилить их в проект'
  },
  {
    value: 'Отпрвить его на проверку'
  }
]

const App = () => (
  <div className={styles.wrapper}>
    <h1>Todo list</h1>
    <InputItem />
    <ItemList tasks={tasks} />
    <Footer tasksCounter={tasks.length}/>
  </div>
);

export default App;
