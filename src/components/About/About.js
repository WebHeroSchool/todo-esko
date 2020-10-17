import React, { useState, useEffect} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './About.module.css';
import { Octokit } from "@octokit/rest";
import Projects from '../../projects.json';

const About = () => {

  const octokit = new Octokit();

  const importedProjects = Projects.projects;

  const initialState = {
    isLoading: false,
    repos: [
      {
        id: 276215960,
        name: "FSD",
        html_url: "https://github.com/Aug512/FSD",
        description: 'Repo for FSD-courses',
        language: 'CSS',
      },
      {
        id: 285895356,
        name: "WHS1stModule",
        html_url: "https://github.com/Aug512/WHS1stModule",
        description: 'Repo for 1st modle of WHS',
        language: 'HTML',
      }
    ],
    projects: importedProjects,
    isError: false,
    errorMessage: '',
    user: {
      avatar_url: "https://avatars1.githubusercontent.com/u/67374673?v=4",
      bio: "I'm just trying to code something",
      email: "dmitriy.esko@gmail.com",
      html_url: "https://github.com/Aug512",
      login: "Aug512",
      name: 'Dmitriy Esko',
      public_repos: 2,
    },
  }

  const [isLoading, setLoadingState] = useState(initialState.isLoading);
  const [repos, getRepos] = useState(initialState.repos);
  const [isError, getError] = useState(initialState.isError);
  const [errorMessage, setErrorMessage] = useState(initialState.errorMessage);
  const [user, getUser] = useState(initialState.user);

  // useEffect( () => {    
  //   octokit.repos.listForUser({
  //     username: 'Aug512',
  //   })
  //   .then( repositories => {
  //       getRepos(repositories.data);
  //       setLoadingState(false);
  //       console.log(repositories.data);
  //   })
  //   .catch( err => {
  //     setLoadingState(false);
  //     getError(err.status);
  //   });
  // }, [])

  // useEffect( () => {    
  //   octokit.users.getByUsername({
  //     username: 'Aug512',
  //   })
  //   .then( userData => {
  //     getUser(userData.data)
  //   })
  //   .catch( err => {
  //     setLoadingState(false);
  //     getError(true);
  //     errProcessing(err.status);
  //   });
  // }, [])

  // const errProcessing = (errorCode) => {
  //   switch (errorCode) {
  //     case 403:
  //       setErrorMessage('Ошибка доступа, попробуйте позже');
  //       break;
  //     case 404:
  //       setErrorMessage('Пользователь не найден');
  //       break;
  //     case 500:
  //       setErrorMessage('Внутренняя ошибка сервера, попробуйте позже');
  //       break;
  //     default:
  //       setErrorMessage('Неизвестная ошибка');
  //       break;
  //   }
  // }

  return(
    <div className={styles.about}>
      {(isLoading) ? <CircularProgress /> : <div style={{width: '100%'}}>
        {(!isLoading && isError) ? <span>{errorMessage}</span> : 
          <div>
            <div className={styles.userInfo}>
              <img src={user.avatar_url} alt="User's avatar" className={styles.userAvatar}/>
              <div className={styles.userBio}>
                <a href={user.html_url}
                  target='blank'
                  className={styles.userName}>
                    {(user.name) ? user.name + ` (aka ${user.login})` : user.login }
                </a>
                <a href="mailto:dmitriy.esko@gmail.com" className={styles.userEmail}><small>{user.email}</small></a>
                <p className={styles.userBio}>"{user.bio}"</p>
                <ul className={styles.projectsList}>Проекты:
                  {initialState.projects.map( (project) => (<li key={project.name}>
                    <a href={project.link} target='blank' className={styles.repoLink}>{project.name}</a>
                    <p className={styles.descr}>{project.description}</p>
                  </li>))}
                </ul>
              </div>
            </div>
            <ol className={styles.reposList}>Репозитории:
              {repos.map( (repo) => (<li key={repo.id} className={styles.repo}>
                  <a href={repo.html_url} target='blank' className={styles.repoLink}>{repo.name}</a>
                  <p className={styles.lang}>Основной язык: {repo.language}</p>
                  <p className={styles.descr}>{repo.description}</p>
                </li>
              ))}
            </ol>
          </div>}
      </div>}
    </div>  
  )
}

export default About;
