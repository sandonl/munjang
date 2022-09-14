import { signOut, useSession } from "next-auth/react";
import React from "react";
import Header from "../components/Header";

interface dashboardProps {}

const dashboard = ({}: dashboardProps) => {
  const { data: session, status } = useSession({ required: true });

  return (
    <>
      <Header />
    </>
  );
};
export default dashboard;
