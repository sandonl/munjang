import { signOut, useSession } from "next-auth/react";
import React from "react";
import Header from "../components/Header";

interface dashboardProps {}

const dashboard = ({}: dashboardProps) => {
  const { data: session, status } = useSession({ required: true });

  const dashboardButton =
    "px-6 py-4 m-3 rounded-md bg-purple-200 text-2xl font-bold hover:bg-purple-100  duration-300 w-56";

  return (
    <>
      <Header />
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-5xl font-bold text-white">
          What would you like to do today?
        </div>
        <div className="p-2" />
        <button className={dashboardButton}> Review Cards </button>
        <button className={dashboardButton}> Add New Cards </button>
      </div>
    </>
  );
};
export default dashboard;
