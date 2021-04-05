import { FormEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import styles from '../styles/components/LoginBox.module.css';

import { UserContext } from '../contexts/UserContext';
import Cookies from 'js-cookie';

export function LoginBox() {
  const router = useRouter();

  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState('');

  async function sendName(e: FormEvent) {
    e.preventDefault();

    Cookies.set('username', username)

    await axios.post('/api/subscribe', {
      username
    }).then(resp => {
      setUser(resp.data)
      router.push('/')
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
        <form onSubmit={sendName} className={styles.sendLogin}>
          <input type='text' 
            id='inputUsername' 
            placeholder="Digite seu username" 
            onChange={e => {setUsername(e.target.value)}}
            required
          />
          <button type='submit'>
            <img src={'/icons/right-arrow.svg'} alt="Right Arrow"/>
          </button>
        </form>
      </div>
    </div>
  );
}