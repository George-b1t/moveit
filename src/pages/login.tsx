import Head from 'next/head';
import React from 'react';

import styles from '../styles/pages/Login.module.css';

import { LoginBox } from '../components/LoginBox';

export default function Login() {

  return (
    <div className={styles.container}>
      <Head>
        <title>
          Login | move.it
        </title>
      </Head>
      <div className={styles.spaceImage}>
        <img src={'/background-logo.svg'} alt='MoveIt Logo'/>
      </div>
      <LoginBox />
    </div>
  );
}