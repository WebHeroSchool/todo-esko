import React from 'react';
import styles from './Repo.module.css';
import classnames from 'classnames';

const Repo = ({repo, isLoaded}) => {

  return(
    <li className={styles.repo}>
      {(isLoaded) ? <div>
        <a href={repo.html_url} target='blank' className={styles.repoLink}>{repo.name}</a>
        <div className={styles.repoInfo}>
          {(repo.langs.length === 0)
            ? null
            : <div className={styles.lang}>
                <span style={{marginBottom: '5px'}}>Языки:</span>        
                {repo.langs.map( lang => {
                  return (<span key={lang} className={
                    classnames({
                      [styles.langValue]: true,
                      [styles.css]: lang==='CSS',
                      [styles.html]: lang==='HTML',
                      [styles.js]: lang==='JavaScript',
                      [styles.scss]: lang==='SCSS',
                    })
                  }>{lang}</span>)
                })}
              </div>
          }
        <p className={styles.descr}>{repo.description}</p>
        </div>
      </div> : <div></div>
      }
    </li>
  )
}

export default Repo;
