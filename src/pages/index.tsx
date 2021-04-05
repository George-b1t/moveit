import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import {  ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext';

import styles from '../styles/pages/Home.module.css';
import { UserContext } from '../contexts/UserContext';

interface HomeProps {
  username: string;
}

export default function Home(props: HomeProps) {
  return (
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
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let username: string;
  try {
    username = ctx.req.cookies.username;
    console.log(username);
  }catch (err) {
    username = 'undefined'
    console.log(err)
  }
  
  return {
    props: {
      username,
    }
  };
};
