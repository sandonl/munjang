import next from "next";
import { useSession } from "next-auth/react";
import React from "react";

interface dashboardProps {}

const dashboard = ({}: dashboardProps) => {
  const { data: session, status } = useSession({ required: true });

  if (status === "authenticated") {
    return (
      <div>
        <p>Welcome {session.user?.name} </p>
      </div>
    );
  } else {
  }
};
export default dashboard;
