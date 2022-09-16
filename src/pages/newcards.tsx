import React from "react";
import Header from "../components/Header";

interface NewCardsProps {}

const NewCards = ({}: NewCardsProps) => {
  return (
    <>
      <Header />
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="flex flex-col p-4 gap-4">
          <div className="flex flex-col text-purple-300 text-3xl font-bold">
            Front
            <input className="rounded-md p-3 text-black" />
          </div>
          <div className="flex flex-col text-purple-300 text-3xl">
            Back
            <input />
          </div>
          <button> Create Card </button>
        </div>
      </div>
    </>
  );
};
export default NewCards;
