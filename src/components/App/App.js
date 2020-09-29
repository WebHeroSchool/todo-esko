import React from 'react';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Footer from '../Footer/Footer';
import './App.css';

const App = () => (
  <div>
    <h1>Todo list</h1>
    <InputItem />
    <ItemList />
    <Footer />
  </div>
);

export default App;