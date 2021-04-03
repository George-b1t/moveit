import { useContext } from 'react';

import styles from '../styles/components/Profile.module.css';

import { ChallengesContext } from '../contexts/ChallengesContext';

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src='https://github.com/George-b1t.png' alt='George Soares'/>
      <div>
        <strong>George Soares</strong>
        <p>
          <img src={'icons/level.svg'} alt='level'/>
          Level { isNaN(level) ? 1 : level }
        </p>
      </div>
    </div>
  );
}
