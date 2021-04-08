import { createContext, useState, ReactNode, useEffect, Dispatch, SetStateAction, useContext } from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';

import { LevelUpModal } from '../components/LevelUpModal';
import { UserContext } from './UserContext';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface UserData {
  username: string;
  level: number;
  challengesCompleted: number;
  currentExperience: number;
}

interface ChallengesContextData {
  name: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completedChallenge: () => void;
  closeLevelUpModal: () => void;
  setLevel: Dispatch<SetStateAction<number>>;
  setCurrentExperience: Dispatch<SetStateAction<number>>;
  setChallengesCompleted: Dispatch<SetStateAction<number>>;
}

interface ChallengesProviderProps {
  children: ReactNode;
  username: string;
}

export const ChallengesContext = createContext({}  as ChallengesContextData);

export function ChallengesProvider({ 
  children,
  ...rest
}: ChallengesProviderProps) {
  const { user, update, findUser } = useContext(UserContext);

  const [name, setName] = useState(user.username ?? rest.username)
  const [level, setLevel] = useState(user.level);
  const [currentExperience, setCurrentExperience] 
    = useState(user.currentExperience);
  const [challengesCompleted, setChallengesCompleted] 
    = useState(user.challengesCompleted);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelAllModalOpen, setIsLevelAllModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  // useEffect(() => {
  //   Notification.requestPermission();
  // }, []);

  useEffect(() => {
    setLevel(user.level);
    setCurrentExperience(user.currentExperience);
    setChallengesCompleted(user.challengesCompleted);
  }, [user.username])

  useEffect(() => {
    Cookies.set('username', name)
    findUser(rest.username);
  }, [challengesCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIsLevelAllModalOpen(true);
  };

  function closeLevelUpModal() {
    setIsLevelAllModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    // if (Notification.permission === 'granted') {
    //   new Notification('Novo desafio 🎉', {
    //     body: `Valendo ${challenge.amount}xp!`
    //   });
    // };
  };

  function resetChallenge() {
    setActiveChallenge(null);
  };

  function completedChallenge() {
    if (!activeChallenge) {
      return;
    };

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
      update({
        username: name,
        level: level + 1,
        challengesCompleted: challengesCompleted + 1,
        currentExperience: finalExperience
      });
    }else {
      update({
        username: name,
        level,
        challengesCompleted: challengesCompleted + 1,
        currentExperience: finalExperience
      });
    };
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  };

  return (
    <ChallengesContext.Provider value={{
      name,
      level, 
      currentExperience, 
      challengesCompleted, 
      activeChallenge,
      experienceToNextLevel,
      levelUp,
      startNewChallenge,
      resetChallenge,
      completedChallenge,
      closeLevelUpModal,
      setLevel,
      setChallengesCompleted,
      setCurrentExperience
    }}>
      { children }

      {isLevelAllModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
