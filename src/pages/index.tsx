import type { NextPage } from "next";
import { signIn } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <>
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-800">
          MUNJANG <span className="text-purple-300 font-extrabold"> 문장 </span>
        </h1>
        <div className="p-4" />
        <div className="text-white text-2xl font-bold">
          An online SRS for learning Korean. 🇰🇷
        </div>
        <div className="text-white text-md p-6 font-bold">
          To find out more about the role of an SRS with language learning, try
          <a
            className="text-purple-500 font-bold"
            href="https://refold.la/"
            target="_blank"
          >
            {" "}
            Refold
          </a>
        </div>
        <button
          className="text-3xl bg-purple-300 px-6 py-4 rounded-md font-bold hover:bg-purple-200 duration-300 "
          onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
        >
          LOGIN
        </button>
      </main>
    </>
  );
};

export default Home;
