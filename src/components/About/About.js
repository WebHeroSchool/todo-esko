import React, { useState, useEffect} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import User from './../User/User';
import Repo from './../Repo/Repo';
import styles from './About.module.css';
import { Octokit } from "@octokit/rest";
import Projects from '../../projects.json';

const About = () => {

  const octokit = new Octokit();

  const importedProjects = Projects.projects;

  const initialState = {
    isLoading: true,
    repos: [
      // {
      //   id: 276215960,
      //   name: "FSD",
      //   html_url: "https://github.com/Aug512/FSD",
      //   description: 'Repo for FSD-courses',
      //   language: 'CSS',
      // },
      // {
      //   id: 285895356,
      //   name: "WHS1stModule",
      //   html_url: "https://github.com/Aug512/WHS1stModule",
      //   description: 'Repo for 1st modle of WHS',
      //   language: 'HTML',
      // },
      // {
      //   id: 285895326,
      //   name: "NoMatter",
      //   html_url: "https://github.com/Aug512/WHS1stModule",
      //   description: 'NoMatter',
      //   language: 'JavaScript',
      // }
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
    },
  }

  const [isLoading, setLoading] = useState(initialState.isLoading);
  const [repos, getRepos] = useState(initialState.repos);
  const [isError, getError] = useState(initialState.isError);
  const [errorMessage, setErrorMessage] = useState(initialState.errorMessage);
  const [user, getUser] = useState(initialState.user);

  useEffect( () => {    
    octokit.repos.listForUser({
      username: 'Aug512',
    })
    .then( repositories => {
      getRepos(repositories.data);
      setLoading(false);
    })
    .catch( err => {
      setLoading(false);
      getError(true);
      errProcessing(err.status);
    });
  }, [])

  useEffect( () => {    
    octokit.users.getByUsername({
      username: 'Aug512',
    })
    .then( userData => {
      getUser(userData.data);
      setLoading(false);
    })
    .catch( err => {
      setLoading(false);
      getError(true);
      errProcessing(err.status);
    });
  }, [])

  const errProcessing = (errorCode) => {
    switch (errorCode) {
      case 403:
        setErrorMessage('Ошибка доступа, попробуйте позже... Где-то через час :)');
        break;
      case 404:
        setErrorMessage('Пользователь не найден');
        break;
      case 500:
        setErrorMessage('Внутренняя ошибка сервера, попробуйте позже');
        break;
      default:
        setErrorMessage('Что-то пошло не так...');
        break;
    }
  }

  return(
    <div className={styles.about}>
      {(isLoading) ? <CircularProgress /> : <div style={{width: '100%'}}>
        {(!isLoading && isError) ? <span>{errorMessage}</span> : 
          <div>
            <User user={user} projects={initialState.projects}/>

            <ul className={styles.reposList}>Репозитории:
              {repos.map( (repo) => (
                <Repo key={repo.id} repo={repo} />
              ))}
            </ul>
          </div>}
      </div>}
    </div>  
  )
}

export default About;
