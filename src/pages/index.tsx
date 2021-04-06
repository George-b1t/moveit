import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie';
import router from 'next/router';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import {  ChallengesProvider } from '../contexts/ChallengesContext';

import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  username: string;
}

export default function Home(props: HomeProps) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    console.log('ok')
    if(props.username) {
      console.log(props.username)
      setIsLogged(true);
    } else {
      router.push('/login')
    }
  }, [])

  return (
    <>
    {isLogged ? (
      <ChallengesProvider 
        username={props.username}
      >
        <div className={styles.container}>
          <Head>
            <title>Início | move.it</title>
          </Head>
          <ExperienceBar />
          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </ChallengesProvider>
    ) : (
      <div style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh'
      }}>
        <div className={styles.loader}></div>
      </div>
    )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let username: string;
  username = ctx.req.cookies.username ?? null
   
  return {
    props: {
      username,
    }
  };
};
