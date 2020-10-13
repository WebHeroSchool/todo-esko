import React, { useState, useEffect} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './About.module.css';
import { Octokit } from "@octokit/rest";

const About = () => {

  const octokit = new Octokit();

  const initialState = {
    isLoading: true,
    repos: [
      {
        id: 276215960,
        name: "FSD",
        html_url: "https://github.com/Aug512/FSD",
      },
      {
        id: 285895356,
        name: "WHS1stModule",
        html_url: "https://github.com/Aug512/WHS1stModule",
      }
    ],
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
                <a href={user.html_url} target='blank' className={styles.userName}>{(user.name) ? user.name + ` (aka ${user.login})` : user.login }</a>
                <p className={styles.userEmail}><small>{user.email}</small></p>
                <p className={styles.userBio}>"{user.bio}"</p>
                <p className={styles.userRepos}>Публичные репозитории: {user.public_repos}</p>
              </div>
            </div>
            <ol className={styles.reposList}>
              {repos.map( (repo) => 
                <li key={repo.id} className={styles.repo}><a href={repo.html_url} target='blank' className={styles.repoLink}>{repo.name}</a></li>
              )}
            </ol>
          </div>}
      </div>}
    </div>  
  )
}

export default About;
