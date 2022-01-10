import type {GetStaticProps, NextPage} from 'next';
import Head from 'next/head';

import Counter from '../components/Counter';
import styles from '../styles/Home.module.css';
import client from '../backend/client';
import {calculateDaysSinceLastIncident} from '../utils/calculate-days-since-last-incident';


interface HomeProps {
  daysSinceLastIncident: number;
}

export const getServerSideProps: GetStaticProps = async () => {
  const {lastIncident} = await client.site.findUnique({where: {id: 1}})!;
  const daysSinceLastIncident = calculateDaysSinceLastIncident(lastIncident);

  return {props: {daysSinceLastIncident}};
};

const Home: NextPage<HomeProps> = ({daysSinceLastIncident}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bearace Edge Counter</title>
        <meta name="description" content="Bearace Edge Counter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bearace Edge Counter
        </h1>

        <Counter count={daysSinceLastIncident} />
      </main>
    </div>
  );
};

export default Home;
