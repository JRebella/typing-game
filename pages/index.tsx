import { GameTimer } from "components/GameTimer/GameTimer";
import { GameInput } from "components/GameInput/GameInput";
import type { NextPage } from "next";
import Head from "next/head";

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
        <GameInput />
      </main>
    </>
  );
};

export default Home;
