import React, { useState, useEffect} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import User from './../User/User';
import Repo from './../Repo/Repo';
import styles from './About.module.css';
import { Octokit } from "@octokit/rest";
import Projects from '../../projects.json';

const About = () => {

  const octokit = new Octokit(
    // {
    //   auth: 'deleteTextAndPluses+5f1c1989+9c189582535c60e0c9112+e6f2b3a36c4',
    // }
  );

    // GitHub автоматически удаляет токены, если они обнаружены в открытых коммитах, поэтому оставляю так,
    // если для проверки потребуется больше 60-ти запросов в час
    // после проверки, скорее всего, токен обновлю, безопасность, все дела)

  const importedProjects = Projects.projects;

  const initialState = {
    isLoading: true,
    projects: importedProjects,
    isError: false,
    errorMessage: '',
    user: {},
    renderedRepos: {
      repos: [],
      currentPage: 1,
      isReposLoaded: false,
    }
  }

  const [isLoading, setLoading] = useState(initialState.isLoading);
  const [renderedRepos, setRenderedRepos] = useState(initialState.renderedRepos);
  const [isError, getError] = useState(initialState.isError);
  const [errorMessage, setErrorMessage] = useState(initialState.errorMessage);
  const [user, getUser] = useState(initialState.user);

  useEffect( () => {
    const fetchData = async () => {
      const data = await getUserdata();
      const pages = await data.data.public_repos;
      const recievedRepos = await getNewRepos(1);

      const newRepos = {...renderedRepos};
      newRepos.repos =  await recievedRepos;
      newRepos.isReposLoaded = true;
      newRepos.currentPage = 1;
      newRepos.pages = await setTotalPages(pages);

      setRenderedRepos(newRepos);
    }
    fetchData()
  }, []);

  useEffect( () => {
    showReposLoader(true);
    updateRepos(renderedRepos.currentPage)
  }, [renderedRepos.currentPage]);

  const showReposLoader = async (loadState) => {
    const state = await loadState;
    const loadRepos = {...renderedRepos}
    loadRepos.isReposLoaded = !state;
    setRenderedRepos(loadRepos);
  }

  const setTotalPages = async (pagesCounter) => {
    let calculatedPages = 1;
    const counter = await pagesCounter;
    console.log(counter);
    if (pagesCounter % 2 === 1) {
      calculatedPages = Math.ceil(counter / 2);
    } else {
      calculatedPages = counter / 2 ;
    }
    return calculatedPages;
  }

  const setCurrentPage = (newPage) => {
    const updatedRepos = {...renderedRepos}
    updatedRepos.currentPage = newPage;
    setRenderedRepos(updatedRepos);
  }

  const getUserdata = async () => {
    const userData = await octokit.request(`GET /users/Aug512`)
    .catch( err => {
      setLoading(false);
      getError(true);
      errProcessing(err.status);
    });
    setLoading(false);
    getUser(userData.data);
    return userData;
  }

  const getNewRepos = async (page) => {
    let requestedRepos = [];
    showReposLoader(true);
    const response = await octokit.request(`GET /users/Aug512/repos?page=${page}&per_page=2`);
    requestedRepos = response.data;
    for (let repo of requestedRepos) {
      repo.langs = await getLangs(repo);
    };
    return requestedRepos;
  }

  const updateRepos = async (page) => {
    const response = await getNewRepos(page);
    const newRepos = {...renderedRepos};
    newRepos.repos = response;
    newRepos.isReposLoaded = true;
    newRepos.currentPage = page;
    setRenderedRepos(newRepos);
  }

  const getLangs = async (repo) => {
    const response = await octokit.request(`GET /repos/Aug512/${repo.name}/languages`);
    return Object.keys(response.data);
  }

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
              { (!renderedRepos.isReposLoaded)
                ? <div><CircularProgress /></div>
                : renderedRepos.repos.map( (repo) => (
                  <Repo key={repo.id} repo={repo} isLoaded={renderedRepos.isReposLoaded}/>
                ))}
              <div className={styles.pagination}>
                {(renderedRepos.currentPage > 1 ) 
                  ? <p className={styles.page} onClick={ () => {
                    setCurrentPage(renderedRepos.currentPage - 1);
                    }}>{'<'}</p> 
                  : null
                }
                <p className={styles.page} style={{fontWeight: '700'}}>{renderedRepos.currentPage}</p>
                {(renderedRepos.currentPage < renderedRepos.pages )
                  ? <p className={styles.page} onClick={ () => {
                    setCurrentPage(renderedRepos.currentPage + 1);
                    }}>{'>'}</p>
                  : null
                }
              </div>
            </ul>
          </div>}
      </div>}
    </div>  
  )
}

export default About;
