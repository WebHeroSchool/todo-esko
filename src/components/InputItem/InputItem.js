import React from 'react';
import styles from './InputItem.module.css';

const InputItem = () => (
  <input type='text' placeholder='Type new task here' className={styles.input}/>
);

export default InputItem;
