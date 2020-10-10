import React, { useState, useEffect } from 'react';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Footer from '../Footer/Footer';
import styles from './App.module.css';

const App = () => {

  const initialState = {
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

  const [activeCounter, setActive] = useState(initialState.activeCounter);
  const [finishedCounter, setFinished] = useState(initialState.finishedCounter);
  const [tasks, setTask] = useState(initialState.tasks);
  const [idCounter, setIdCounter] = useState(initialState.idCounter);

  useEffect( () => {
    console.log('Mounted');
  }, []);

  useEffect( () => {
    console.log('Updated');
  });

  const onClickDone = (id) => {
    const newTasks = tasks.map(task => {
      const newTask = {...task};

      if (newTask.id === id) {
        newTask.isDone = !task.isDone;
      }

      return newTask;
    }); 

    let active = 0;
    let finished = 0;
    newTasks.forEach(task => {
      (task.isDone === false) ? active += 1 : finished += 1;
    });

    setTask(newTasks);
    setActive(active);
    setFinished(finished);
  };

  const addTask = val => {
    const newTasks = [
      ...tasks,
      {
        id: idCounter + 1,
        value: val,
        isDone: false,
      }
    ]
    setTask(newTasks);
    setActive(activeCounter + 1);
    setIdCounter(idCounter + 1);
  }

  const deleteTask = (filteredId) => {
    let isTaskDone = true;
    const newTasks = [];
    tasks.map(task => {
      (task.id !== filteredId) ? newTasks.push(task) : isTaskDone = task.isDone;
    });

    if (isTaskDone) {
      setTask(newTasks);
      setFinished(finishedCounter - 1 );
    } else {
      setTask(newTasks);
      setActive(activeCounter - 1 );
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Todo list</h1>
      <InputItem addTask={addTask} />
      <ItemList tasks={tasks} onClickDone={onClickDone} deleteTask={deleteTask}/>
      <Footer activeCounter={activeCounter} finishedTasks={finishedCounter}/>
    </div>
  )
}

export default App;
