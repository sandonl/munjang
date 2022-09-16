import { signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import React from "react";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const { data: session, status } = useSession({ required: true });

  return (
    <div
      className="absolute bg-purple-300 p-3 h-16 top-0 w-full 
    flex justify-between items-center"
    >
      <NextLink href={"/dashboard"}>
        <a className="text-gray-700 text-2xl font-extrabold px-5">
          MUNJANG <span className="text-purple-500"> 문장 </span>
        </a>
      </NextLink>
      <div className="flex items-center">
        <div className="font-bold mx-2">{session?.user?.name}</div>
        <img
          src={session?.user?.image!}
          alt="User image"
          className=" rounded-full w-7 h-7 mx-2"
        />
        <button
          className="px-4 py-2 rounded-md bg-purple-300 hover:bg-purple-200  duration-300 font-semibold"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
export default Header;
