import React from "react";
import Card from "../components/Card";
import Header from "../components/Header";

interface reviewcardsProps {}

const reviewcards = ({}: reviewcardsProps) => {
  return (
    <>
      <Header />
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <Card front={"This is the front"} back={"This is the back"} />
      </div>
    </>
  );
};
export default reviewcards;
