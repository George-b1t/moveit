import { useContext } from 'react';

import styles from '../styles/components/ExperienceBar.module.css';

import { ChallengesContext } from '../contexts/ChallengesContext';

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

  const percentToNextLevel = isNaN(currentExperience) ? 
  0 : Math.round(currentExperience * 100) / experienceToNextLevel;
  
  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }}/>

        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
          {isNaN(currentExperience) ? 0 : currentExperience} xp
        </span>
      </div>
      <span>{isNaN(experienceToNextLevel) ? 64 : experienceToNextLevel} xp</span>
    </header>
  );
}
