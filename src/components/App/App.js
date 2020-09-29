import React from 'react';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Footer from '../Footer/Footer';
import './App.css';

const tasks = ['Разобраться с props-ми', 'Впилить их в проект', 'Отпрвить его на проверку']

const App = () => (
  <div>
    <h1>Todo list</h1>
    <InputItem />
    <ItemList tasks={tasks}/>
    <Footer tasksCounter={tasks.length}/>
  </div>
);

export default App;
