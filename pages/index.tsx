import { GameArea } from "components/GameInput/GameArea";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen overflow-auto flex flex-col">
      <Head>
        <title>Word typing game!</title>
        <meta name="description" content="By Juan Rebella" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col max-w-[800px] w-full items-center m-auto mt-8 px-4">
        <h1 className="text-4xl text-center mb-4">Word typing game</h1>

        <GameArea />
      </main>

      <footer className="p-4">
        By{" "}
        <a
          className="text-blue-700 hover:text-blue-500 underline"
          href="https://www.juanrebella.dev/"
          target={"_blank"}
          rel="noreferrer"
        >
          Juan Rebella
        </a>{" "}
        -{" "}
        <a
          className="text-blue-700 hover:text-blue-500 underline"
          href="https://github.com/JRebella/typing-game"
          target={"_blank"}
          rel="noreferrer"
        >
          Github
        </a>{" "}
        - 2022
      </footer>
    </div>
  );
};

export default Home;
