import React from 'react';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Footer from '../Footer/Footer';
import styles from './App.module.css';

class App extends React.Component {
  render() {
    const tasks = [
      {
        value: 'Разобраться с props-ми',
        isDone: true,
      },
      {
        value: 'Впилить их в проект',
        isDone: true,
      },
      {
        value: 'Отпрвить его на проверку',
        isDone: true,
      },
      {
        value: 'Закончить реализацию проекта',
        isDone: false,
      }
    ];
    
    return (
      <div className={styles.wrapper}>
        <h1>Todo list</h1>
        <InputItem />
        <ItemList tasks={tasks} />
        <Footer tasksCounter={tasks.length}/>
      </div>
    )
  }
}

export default App;
