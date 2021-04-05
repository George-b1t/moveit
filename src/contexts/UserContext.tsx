import { createContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from "react";
import axios from 'axios';

interface UserContextData {
  user: UserData;
  setUser: Dispatch<SetStateAction<UserData>>,
  update: (userData: UserData) => void,
  findUser: (username: string) => void
}

interface UserData {
  username: string;
  level: number;
  challengesCompleted: number;
  currentExperience: number;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps ) {
  const [user, setUser] = useState({} as UserData);

  async function findUser(username: string) {
    await (async () => {
      await axios.post('/api/subscribe',{
        username
      }).then(r => {
        setUser(r.data);
      }).catch(err => {});
    })();
  }

  async function update(userData: UserData) {
    await axios.post('/api/updateuser', {
      ...userData
    });
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      update,
      findUser
    }}>
      { children }
    </UserContext.Provider>
  );
}
