import React, { useState } from 'react';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Footer from '../Footer/Footer';

export default function Todo() {

  const initialState = {
    tasks: [
      {
        id: 1,
        value: '1',
        isDone: true,
        isVisible: true,
        isEditing: false,
      },
      {
        id: 2,
        value: '2',
        isDone: true,
        isVisible: true,
        isEditing: false,
      },
      {
        id: 3,
        value: '3',
        isDone: true,
        isVisible: true,
        isEditing: false,
      },
      {
        id: 4,
        value: '4',
        isDone: false,
        isVisible: true,
        isEditing: false,
      }
    ],
    activeCounter: 1,
    finishedCounter: 3,
    idCounter: 4,
    filter: 'all',
    tempValue: '',
    errorMessage: '',
    editingError: false,
  };

  const [activeCounter, setActive] = useState(initialState.activeCounter);
  const [finishedCounter, setFinished] = useState(initialState.finishedCounter);
  const [tasks, setTask] = useState(initialState.tasks);
  const [idCounter, setIdCounter] = useState(initialState.idCounter);
  const [filter, setFliter] = useState(initialState.filter);
  const [tempValue, setTempValue] = useState(initialState.tempValue);
  const [editingError, setError] = useState(initialState.editingError);
  const [errorMessage, setErrorMessage] = useState(initialState.errorMessage);

  const onClickDone = (id) => {
    const newTasks = tasks.map(task => {
      const newTask = {...task};

      if (newTask.id === id) {
        newTask.isDone = !task.isDone;

        if (filter !== 'all') {
          newTask.isVisible = !task.isVisible
        }
      }

      return newTask;
    }); 

    setTask(newTasks);

    let active = 0;
    let finished = 0;
    newTasks.forEach(task => {
      (task.isDone === false) ? active++ : finished++;
    });

    setActive(active);
    setFinished(finished);
  };

  const editTask = (id, value) => {
    const newTasks = tasks.map(task => {

      const newTask = {...task};

      if (newTask.id === id) {
        newTask.isEditing = true;
      }

      return newTask;
    }); 

    setTempValue(value)
    setTask(newTasks);
  };

  const throwErr = (message) => {
    setErrorMessage(message);
    setError(true);
  }

  const aproveTask = (id, tempValue) => {
    let isTaskExist = false;
    let isSimilar = false;
    
    const newTasks = tasks.map(task => {

      const newTask = {...task};

      if (tempValue === newTask.value) {
        isTaskExist = true;       //Проверяем на совпадение с уже существующими задачами
      }

      if (newTask.id === id) {

        if (tempValue === newTask.value && newTask.isEditing === true) {
          isSimilar = true;       //Проверяем на совпадение с текущей (редактируемой) задачей
        }

        newTask.value = tempValue;
        newTask.isEditing = false;
      }

      return newTask;
    }) 

    if (isTaskExist && !isSimilar) {      //Ошибка, если существует другая такая же задача
      throwErr('Такая задача уже существует');
      isTaskExist = false;
    } else if (!isTaskExist || isSimilar) {       //Успех, если не существует другой такой же задачи, или это та же самая задача
      setTask(newTasks);
      isTaskExist = false;
    }
  }

  const addTask = val => {

    let isThisTaskVisible = true;

    if (filter === 'finished') {
      isThisTaskVisible = false
    }

    const newTasks = [
      ...tasks,
      {
        id: idCounter + 1,
        value: val,
        isDone: false,
        isVisible: isThisTaskVisible,
        isEditing: false,
      }
    ]    
    setTask(newTasks);
    setActive(activeCounter + 1);
    setIdCounter(idCounter + 1);
    console.log(newTasks);
  }

  const deleteTask = (filteredId) => {
    let isTaskDone = true;
    const newTasks = [];
    tasks.map(task => {
      return (task.id !== filteredId) ? newTasks.push(task) : isTaskDone = task.isDone;
    });

    if (isTaskDone) {
      setTask(newTasks);
      setFinished(finishedCounter - 1 );
    } else {
      setTask(newTasks);
      setActive(activeCounter - 1 );
    }
  };

  const deleteFinished = () => {
    const newTasks = [];
    tasks.forEach( task => {
      if (!task.isDone) {
        newTasks.push(task)
      };
    })
    setTask(newTasks);
    setFinished(0);
  }

  const showAll = () => {
    setFliter('all');
    const newTasks = [];
    tasks.forEach( task => {
      task.isVisible = true;
      newTasks.push(task);
      console.log(task);
    });
    setTask(newTasks);
  }

  const showActive = () => {
    setFliter('active');
    const newTasks = [];
    tasks.forEach( task => {
      !task.isDone ? task.isVisible = true : task.isVisible = false;
      newTasks.push(task);
    });
    setTask(newTasks);
  }

  const showFinished = () => {
    setFliter('finished');
    const newTasks = [];
    tasks.forEach( task => {
      task.isDone ? task.isVisible = true : task.isVisible = false;
      newTasks.push(task);
    });
    setTask(newTasks);
  }

  return (
    <div>
      <p style={{fontSize: '1.7em'}}>Текущие задачи</p>
      <InputItem addTask={addTask} currentTasks={tasks}/>
      <ItemList
        tasks={tasks}
        onClickDone={onClickDone}
        deleteTask={deleteTask}
        editTask={editTask}
        aproveTask={aproveTask}
        tempValue={tempValue}
        setTempValue={setTempValue}
        editingError={editingError}
        errorMessage={errorMessage}
        setError={setError}
        setErrorMessage={setErrorMessage}
        />
      <Footer
        activeCounter={activeCounter}
        finishedTasks={finishedCounter}
        showAll={showAll}
        showActive={showActive}
        showFinished={showFinished}
        deleteFinished={deleteFinished}/>
    </div>
  )
}
