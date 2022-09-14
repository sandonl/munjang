import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

interface loginProps {}

const login = ({}: loginProps) => {
  const { data: session } = useSession();

  if (session) {
    console.log(session!.user?.image);
    return (
      <div>
        Welcome, {session.user?.name}
        <img src={session.user?.image!} alt="" className="rounded-full" />
        <button onClick={() => signOut()}> Sign Out </button>
      </div>
    );
  } else {
    return (
      <div>
        <p> You are not signed in. </p>
        <button
          onClick={() => signIn()}
          className="border text-2xl bg-gray-300 rounded-sm p-2"
        >
          Sign In
        </button>
      </div>
    );
  }
};

export default login;
