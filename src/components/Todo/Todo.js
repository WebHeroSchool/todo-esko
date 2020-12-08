import React, { useEffect, useState } from 'react';
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
        value: "Разобрать носки аккуратно в стопки",
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

  const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: []
  }
    
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {document.removeEventListener('click', handleClickOutside)}
  });

  const handleClickOutside = (e) => {
    // Получаем ссылку на элемент, при клике на который, скрытие не будет происходить
    const textField = document.getElementById('editing');
    
    if (textField) {
      const nodes = e.composedPath();
      const taskId = textField.getAttribute('data')

      if (!nodes.includes(textField)) {
        
        approveTask(+taskId, tempValue);
      }
    }
  }

  const [list, setList] = useState(initialState.tasks);
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  
  // onDragStart fires when an element
  // starts being dragged
  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);
    
    setDragAndDrop({
    ...dragAndDrop,
    draggedFrom: initialPosition,
    isDragging: true,
    originalOrder: list
    });
    
    // Note: this is only for Firefox.
    // Without it, the DnD won't work.
    // But we are not using it.
    event.dataTransfer.setData("text/html", '');
  }
  
    // onDragOver fires when an element being dragged
    // enters a droppable area.
    // In this case, any of the items on the list
  const onDragOver = (event) => {
     
     // in order for the onDrop
     // event to fire, we have
     // to cancel out this one
    event.preventDefault();
    
    let newList = dragAndDrop.originalOrder;
  
    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom; 
  
    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position); 
  
    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter((item, index) => index !== draggedFrom);
   
      newList = [
       ...remainingItems.slice(0, draggedTo),
       itemDragged,
       ...remainingItems.slice(draggedTo)
      ];
       
    if (draggedTo !== dragAndDrop.draggedTo){
      setDragAndDrop({
      ...dragAndDrop,
      updatedOrder: newList,
      draggedTo: draggedTo
      })
    }
  }
    
  const onDrop = () => {
    
    setList(dragAndDrop.updatedOrder);
    setTask(dragAndDrop.updatedOrder)
    
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false
    });
  }
  
  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null
    });     
  }

  function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : initialValue;
      } catch (e) {
        return initialValue;
      }
    });
  
    const setValue = value => {
      try {
        
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        
        setStoredValue(valueToStore);
        
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error)
      }
    };
  
    return [storedValue, setValue];
  }

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
    setList(newTasks);

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
    setList(newTasks);
  };

  const throwErr = (message) => {
    setErrorMessage(message);
    setError(true);
  }

  const approveTask = (id, tempValue) => {
    let isTaskExist = false;
    let isSimilar = false;
    
    const newTasks = tasks.map(task => {

      const newTask = {...task};

      if (tempValue === newTask.value && id !== newTask.id) {
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
      setList(newTasks);
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
    setList(newTasks);
    setActive(activeCounter + 1);
    setIdCounter(idCounter + 1);
  }

  const deleteTask = (filteredId) => {
    let isTaskDone = true;
    const newTasks = [];
    tasks.map(task => {
      return (task.id !== filteredId) ? newTasks.push(task) : isTaskDone = task.isDone;
    });

    if (isTaskDone) {
      setTask(newTasks);
      setList(newTasks);
      setFinished(finishedCounter - 1);
    } else {
      setTask(newTasks);
      setList(newTasks);
      setActive(activeCounter - 1);
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
    setList(newTasks);
    setFinished(0);
  }

  const showAll = () => {
    setFliter('all');
    const newTasks = [];
    tasks.forEach( task => {
      task.isVisible = true;
      newTasks.push(task);
    });
    setTask(newTasks);
    setList(newTasks);
  }

  const showActive = () => {
    setFliter('active');
    const newTasks = [];
    tasks.forEach( task => {
      !task.isDone ? task.isVisible = true : task.isVisible = false;
      newTasks.push(task);
    });
    setTask(newTasks);
    setList(newTasks);
  }

  const showFinished = () => {
    setFliter('finished');
    const newTasks = [];
    tasks.forEach( task => {
      task.isDone ? task.isVisible = true : task.isVisible = false;
      newTasks.push(task);
    });
    setTask(newTasks);
    setList(newTasks);
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
        approveTask={approveTask}
        tempValue={tempValue}
        setTempValue={setTempValue}
        editingError={editingError}
        errorMessage={errorMessage}
        setError={setError}
        setErrorMessage={setErrorMessage}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
        dragAndDrop={dragAndDrop}
        />
      <Footer
        activeCounter={activeCounter}
        finishedTasks={finishedCounter}
        showAll={showAll}
        showActive={showActive}
        showFinished={showFinished}
        deleteFinished={deleteFinished}
        filter={filter}/>
    </div>
  )
}
