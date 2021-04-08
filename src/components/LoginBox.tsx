import { FormEvent, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import styles from '../styles/components/LoginBox.module.css';

import { UserContext } from '../contexts/UserContext';
import Cookies from 'js-cookie';

export function LoginBox() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isNameInputed, setIsNameInputed] = useState(false);
  const [isIncorrectPass, setIsIncorrectPass] = useState(false);

  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log(password)
  }, [password])

  async function sendName(e: FormEvent) {
    e.preventDefault();

    Cookies.set('username', username);
    setIsLoading(true);

    await axios.post('/api/subscribe', {
      username,
      password
    }).then(resp => {
      setUser(resp.data)
      router.push('/')
    }).catch(() => {
      setIsIncorrectPass(true)
      setIsLoading(false);
    });
  };

  return (
    <div className={styles.container}>
      <img src={'/logo-full-login.svg'} alt='Logo Full'/>
      <div className={styles.content}>
        <div className={styles.welcome}>
          <h1>Bem Vindo</h1>
          <div className={styles.welcomeWithGithub}>
            <img src={'/icons/github.svg'} alt='GitHub'/>
            <p>Faça login com seu Github para começar</p>
          </div>
        </div>

      {isNameInputed ? (
        <>
          <form onSubmit={sendName} className={styles.sendLogin}>
            {!isNameInputed ? (
              <input type='text' 
              value={username}
              placeholder="Digite seu username"
              onChange={e => {setUsername(e.target.value);}}
              required
            />
            ) : (
              <input type='password' 
                placeholder="Digite sua senha" 
                className={styles.inputPass}
                value={password}
                onChange={e => {setPassword(e.target.value)}}
                required
              />
            )}
            
            <button
              onClick={() => {setIsNameInputed(true)}}
              className={isNameInputed ? styles.inputPass : ''}
              type='submit'
            >
              {isLoading ? (
                <div className={`${styles.loader}`}></div>
              ) : (
                <img src={'/icons/right-arrow.svg'} alt="Right Arrow"/>
              )}
            </button>
          </form>
          {isIncorrectPass ? (
            <p><strong className={styles.incPass}>Incorret Password</strong></p>
          ) : (<></>)}
        </>
      ) : (
        <>
          <form onSubmit={(e) => {e.preventDefault(); setIsNameInputed(true)}} className={styles.sendLogin}>
            {!isNameInputed ? (
              <input type='text' 
              value={username}
              placeholder="Digite seu username"
              onChange={e => {setUsername(e.target.value);}}
              required
            />
            ) : (
              <input type='password' 
                placeholder="Digite sua senha" 
                className={styles.inputPass}
                value={password}
                onChange={e => {setPassword(e.target.value)}}
                required
              />
            )}
            
            <button
              className={isNameInputed ? styles.inputPass : ''}
              type='submit'
            >
              {isLoading ? (
                <div className={`${styles.loader}`}></div>
              ) : (
                <img src={'/icons/right-arrow.svg'} alt="Right Arrow"/>
              )}
            </button>
          </form>
        </>
      )}
      </div>
    </div>
  );
}