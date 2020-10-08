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
    idCounter: 4,
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

  addTask = val => this.setState( state => ({
    tasks: [
      ...state.tasks,
      {
        id: state.idCounter + 1,
        value: val,
        isDone: false,
      }
    ],
    activeCounter: state.activeCounter + 1,
    idCounter: state.idCounter + 1,
  }))

  deleteTask = (filteredId) => {
    let isTaskDone = true;
    const newTasks = [];
    this.state.tasks.map(task => {
      if (task.id !== filteredId) {
        newTasks.push(task);
      } else {
        isTaskDone = task.isDone;
      }
    });

    if (isTaskDone) {
      this.setState( state => {
        return {
          tasks: newTasks,
          finishedCounter: state.finishedCounter - 1,
        }
      })
    } else {
      this.setState( state => {
        return {
          tasks: newTasks,
          activeCounter: state.activeCounter - 1,
        }
      })
    }
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>Todo list</h1>
        <InputItem addTask={this.addTask} />
        <ItemList tasks={this.state.tasks} onClickDone={this.onClickDone} deleteTask={this.deleteTask}/>
        <Footer activeCounter={this.state.activeCounter} finishedTasks={this.state.finishedCounter}/>
      </div>
    )
  }
}

export default App;
