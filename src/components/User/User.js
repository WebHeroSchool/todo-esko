import React from 'react';
import styles from './User.module.css';

const User = ({user, projects}) => {
  return(
    <div className={styles.userInfo}>
      <img src={user.avatar_url} alt="User's avatar" className={styles.userAvatar}/>
      <div className={styles.userBio}>
        <a href={user.html_url}
          target='blank'
          className={styles.userName}>
            {(user.name) ? user.name + ` (aka ${user.login})` : user.login }
        </a>
        <a href="mailto:dmitriy.esko@gmail.com" className={styles.userEmail}><small>{(user.email) ? user.email : 'dmitriy.esko@gmail.com'}</small></a>
        <p className={styles.userBio}>"{user.bio}"</p>
      </div>
      <ul className={styles.projectsList}>Проекты:
        {projects.map( (project) => (<li key={project.name} className={styles.project}>
          <a href={project.link} target='blank' className={styles.projectLink}>{project.name}</a>
          <p className={styles.descr}>{project.description}</p>
        </li>))}
      </ul>
    </div>
  )
}

export default User;
