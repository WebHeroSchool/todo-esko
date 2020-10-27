import React, { useState, useEffect} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import User from './../User/User';
import Repo from './../Repo/Repo';
import styles from './About.module.css';
import { Octokit } from "@octokit/rest";
import Projects from '../../projects.json';

const About = () => {

  const octokit = new Octokit({
    auth: "ebbfeb83dadda9b33cc36f740fca4ab63a95b415",
  });

  const importedProjects = Projects.projects;

  const initialState = {
    isLoading: true,
    projects: importedProjects,
    isError: false,
    errorMessage: '',
    user: {
      // avatar_url: "https://avatars1.githubusercontent.com/u/67374673?v=4",
      // bio: "I'm just trying to code something",
      // email: "dmitriy.esko@gmail.com",
      // html_url: "https://github.com/Aug512",
      // login: "Aug512",
      // name: 'Dmitriy Esko',
      // public_repos: 10,
    },
    renderedRepos: {
      pages: 2,
      repos: [
        // {
        //   id: 276215960,
        //   name: "FSD",
        //   html_url: "https://github.com/Aug512/FSD",
        //   description: 'Repo for FSD-courses',
        //   langs: [ 'CSS', 'HTML', 'JavaScript', 'SCSS' ]
        // },
        // {
        //   id: 285895356,
        //   name: "WHS1stModule",
        //   html_url: "https://github.com/Aug512/WHS1stModule",
        //   description: 'Repo for 1st modle of WHS',
        //   langs: [ 'CSS', 'HTML', 'JavaScript' ]
        // }
      ],
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
    getUserdata();
  }, []);

  useEffect( () => {
    showReposLoader(true);
    updateRepos(1);
  }, [user])

  useEffect( () => {
    showReposLoader(true);
    updateRepos(renderedRepos.currentPage)
  }, [renderedRepos.currentPage]);

  const showReposLoader = (loadState) => {
    const loadRepos = {...renderedRepos}
    loadRepos.isReposLoaded = !loadState;
    setRenderedRepos(loadRepos);
  }

  const setTotalPages = async (pagesCounter) => {
    const counter = await pagesCounter;
    console.log(counter);
    const reposWithPages = {...renderedRepos};
    let calculatedPages = 1;
    if (counter % 2 === 1) {
      calculatedPages = counter / 2 + 1;
    } else {
      calculatedPages = counter / 2 ;
    }
    console.log(calculatedPages);
    reposWithPages.pages = calculatedPages;
    setRenderedRepos(reposWithPages);
  }

  const setCurrentPage = (newPage) => {
    const updatedRepos = {...renderedRepos}
    updatedRepos.currentPage = newPage;
    setRenderedRepos(updatedRepos);
  }

  // const getNewRepos = (page) => {
  //   let requestedRepos = [];
  //   showReposLoader(true);
  //   octokit.request(`GET /users/Aug512/repos?page=${page}&per_page=2`)
  //   .then( repositories => {
  //     requestedRepos = repositories.data.slice(0);
  //     return requestedRepos;
  //   })
  //   .then ( (requestedRepos) => {
  //     for (let repo of requestedRepos) {
  //       repo.langs = getLangs(repo);
  //     }
  //     return (requestedRepos)
  //   })
  //   .then( requestedRepos => {
  //     const newRepos = {...renderedRepos};
  //     setTotalPages(user.public_repos);
  //     newRepos.repos = requestedRepos;
  //     newRepos.isReposLoaded = true;
  //     newRepos.currentPage = page;
  //     console.log(newRepos);
  //     setRenderedRepos(newRepos)
  //   })
  //   .catch( err => {
  //     setLoading(false);
  //     getError(true);
  //     errProcessing(err.status);
  //   });
  // }

  const getUserdata = async () => {
    const userData = await octokit.users.getByUsername({
      username: 'Aug512',
     }).catch( err => {
      setLoading(false);
      getError(true);
      errProcessing(err.status);
    });
    getUser(userData.data);
    console.log(userData.data);
    setTotalPages(userData.data.public_repos);
    setLoading(false);
  }

  const getNewRepos = async (page) => {
    let requestedRepos = [];
    // showReposLoader(true);
    const response = await octokit.request(`GET /users/Aug512/repos?page=${page}&per_page=2`);
    requestedRepos = response.data;
    console.log(requestedRepos);
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
    console.log(newRepos);
  }

  const getLangs = async (repo) => {
    const response = await octokit.request(`GET /repos/Aug512/${repo.name}/languages`);
    console.log(response.data);
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
