import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.css";

// SSR enabled, all data is pre-fetched in the server

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js Strapi CMS template</title>
        <meta name="description" content="By Juan Rebella" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Next.js + Strapi template</h1>

        <ul className="p-8 shadow-lg border-2 m-4">
          <h2 className="text-xl font-bold">Tech stack</h2>
          <li>Next.js</li>
          <li>Typescript</li>
          <li>Strapi v4</li>
          <li>GraphQL + @strapi/plugin-graphql</li>
          <li>Apollo GraphQL Client</li>
          <li>Tailwind CSS</li>
          <li>GraphQL Code Generator</li>
        </ul>
      </main>
    </div>
  );
};

export default Home;
