import { useContext } from 'react';

import styles from '../styles/components/Profile.module.css';

import { ChallengesContext } from '../contexts/ChallengesContext';

export function Profile() {
  const { name, level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src={'/icons/user.svg'} alt='User Image'/>
      <div>
        <strong>{name}</strong>
        <p>
          <img src={'icons/level.svg'} alt='level'/>
          Level { isNaN(level) ? 1 : level }
        </p>
      </div>
    </div>
  );
}
