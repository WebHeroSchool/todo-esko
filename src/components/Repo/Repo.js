import React from 'react';
import styles from './Repo.module.css';

function Repo(repository) {

  return(
    <li className={styles.repo}>
      <a href={repository.html_url} target='blank' className={styles.repoLink}>{repository.name}</a>
      <p>Основной язык: {repository.language}</p>
      <p>{repository.description}</p>
    </li>
  )
}

export default Repo;
