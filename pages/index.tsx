import type {GetStaticProps, NextPage} from 'next';
import Head from 'next/head';

import Counter from '../components/Counter';
import styles from '../styles/Home.module.css';
import client from '../backend/client';
import {Site} from '../typings/Site';


interface HomeProps {
  site: Site;
}

export const getServerSideProps: GetStaticProps = async () => {
  const site = await client.site.findUnique({where: {id: 1}});
  return {props: {site}};
};

const Home: NextPage<HomeProps> = ({site}) => {
  const {counter} = site;

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

        <Counter count={counter} />
      </main>
    </div>
  );
};

export default Home;
