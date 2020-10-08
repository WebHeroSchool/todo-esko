import React from 'react';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Footer from '../Footer/Footer';
import styles from './App.module.css';

class App extends React.Component {
  state = {
    tasks: [
      {
        id: 1,
        value: 'Разобраться с props-ми',
        isDone: true,
      },
      {
        id: 2,
        value: 'Впилить их в проект',
        isDone: true,
      },
      {
        id: 3,
        value: 'Отпрвить его на проверку',
        isDone: true,
      },
      {
        id: 4,
        value: 'Закончить реализацию проекта',
        isDone: false,
      }
    ],
    activeCounter: 1,
    finishedCounter: 3,
  };

  onClickDone = (id) => {
    const newTasks = this.state.tasks.map(task => {
      const newTask = {...task};

      if (newTask.id === id) {
        newTask.isDone = !task.isDone;
      }

      return newTask;
    }); 

    let active = 0;
    let finished = 0;
    newTasks.forEach(task => {
      (task.isDone === false) ? active += 1 : finished +=1;
    });

    this.setState( {tasks: newTasks, activeCounter: active, finishedCounter: finished} )
  };

  deleteTask = (filteredId) => {
    const newTasks = [];
    this.state.tasks.map(task => {
      if (task.id !== filteredId) {
        newTasks.push(task);
      }
    });

    this.setState( {tasks: newTasks})
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>Todo list</h1>
        <InputItem />
        <ItemList tasks={this.state.tasks} onClickDone={this.onClickDone} deleteTask={this.deleteTask} />
        <Footer tasksCounter={this.state.activeCounter} finishedTasks={this.state.finishedCounter}/>
      </div>
    )
  }
}

export default App;
