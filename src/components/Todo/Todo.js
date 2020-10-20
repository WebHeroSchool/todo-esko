import React, { useState } from 'react';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Footer from '../Footer/Footer';

export default function Todo() {

  const initialState = {
    tasks: [
      {
        id: 1,
        value: "Повесить в ванной полку",
        isDone: true,
        isVisible: true,
        isEditing: false,
      },
      {
        id: 2,
        value: "Разложить бельё",
        isDone: true,
        isVisible: true,
        isEditing: false,
      },
      {
        id: 3,
        value: "Разобрать носки аккуратно в стопку",
        isDone: false,
        isVisible: true,
        isEditing: false,
      },
      {
        id: 4,
        value: "Убрать с гладильной доски платья и колготки",
        isDone: false,
        isVisible: true,
        isEditing: false,
      },
      {
        id: 5,
        value: "Сходить в магазин, купить хлеб и масло",
        isDone: false,
        isVisible: true,
        isEditing: false,
      },
      {
        id: 6,
        value: "На обратном пути вытряхнуть палас",
        isDone: false,
        isVisible: true,
        isEditing: false,
      }
    ],
    activeCounter: 4,
    finishedCounter: 2,
    idCounter: 6,
    filter: 'all',
    tempValue: '',
    errorMessage: '',
    editingError: false,
  };

  function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
  
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = value => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
  
    return [storedValue, setValue];
  }

  // const [activeCounter, setActive] = useState(initialState.activeCounter);
  // const [finishedCounter, setFinished] = useState(initialState.finishedCounter);
  // const [tasks, setTask] = useState(initialState.tasks);
  // const [idCounter, setIdCounter] = useState(initialState.idCounter);
  const [activeCounter, setActive] = useLocalStorage('activeCounter', initialState.activeCounter);
  const [finishedCounter, setFinished] = useLocalStorage('finishedCounter', initialState.finishedCounter);
  const [tasks, setTask] = useLocalStorage('tasks', initialState.tasks);
  const [idCounter, setIdCounter] = useLocalStorage('idCounter', initialState.idCounter);

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

    localStorage.setItem("tasks", JSON.stringify(newTasks));
    localStorage.setItem("activeCounter", active);
    localStorage.setItem("finishedCounter", finished);
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
