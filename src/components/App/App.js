import React from 'react';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Footer from '../Footer/Footer';
import './App.css';

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
  <div className='wrapper'>
    <h1>Todo list</h1>
    <InputItem className='app__input'/>
    <ItemList tasks={tasks} className='app__list'/>
    <Footer tasksCounter={tasks.length}/>
  </div>
);

export default App;
