import { GameTimer } from "components/GameTimer/GameTimer";
import { GameContext, GameContextProvider } from "context/GameContext";
import { useStopWatch } from "hooks/useStopWatch";
import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useContext, useEffect, useState } from "react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Word typing game!</title>
        <meta name="description" content="By Juan Rebella" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen m-10 flex flex-col items-start">
        <h1 className="text-4xl">Word typing game</h1>

        <GameTimer />
      </main>
    </>
  );
};

export default Home;
