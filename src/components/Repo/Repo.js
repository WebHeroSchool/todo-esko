import React from 'react';
import styles from './Repo.module.css';
import classnames from 'classnames';

const Repo = ({repo}) => {

  return(
    <li className={styles.repo}>
      <a href={repo.html_url} target='blank' className={styles.repoLink}>{repo.name}</a>
      {(repo.language) ?
        <p className={styles.lang}>Основной язык:
          <span className={
            classnames({
              [styles.langValue]: true,
              [styles.css]: repo.language==='CSS',
              [styles.html]: repo.language==='HTML',
              [styles.js]: repo.language==='JavaScript',
            })
          }>{repo.language}</span>
        </p> :
        null}
      <p className={styles.descr}>{repo.description}</p>
    </li>
  )
}

export default Repo;
