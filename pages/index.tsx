import {Container, Grid} from '@mui/material';
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
  const site = await client.site.findUnique({where: {id: 1}});
  const {lastIncident} = site!;

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
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <h1 className={styles.title}>
                Bearace Edge Counter
              </h1>
            </Grid>

            <Grid item xs={12}>
              <Counter count={daysSinceLastIncident} />
            </Grid>
          </Grid>

        </Container>
      </main>
    </div>
  );
};

export default Home;
