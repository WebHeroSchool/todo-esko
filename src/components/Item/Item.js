import React from 'react';
import styles from'./Item.module.css';

const Item = ({value}) => (
<li className={styles.item}>{value}</li>
);

export default Item;
