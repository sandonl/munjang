import { useSession } from "next-auth/react";
import React from "react";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const { data: session, status } = useSession({ required: true });

  return (
    <div
      className="bg-purple-300 p-3 h-16 top-0 w-full 
    flex justify-between items-center"
    >
      <div className="text-gray-700 font-extrabold px-5">
        MUNJANG <span className="text-purple-500"> 문장 </span>
      </div>
      <div className="flex items-center">
        <div className="font-bold mx-2">Welcome {session?.user?.name}</div>
        <img
          src={session?.user?.image!}
          alt="User image"
          className=" rounded-full w-7 h-7 mx-2"
        />
        <button className="px-4 py-2 rounded-md bg-purple-300 hover:bg-purple-200  duration-300 font-semibold">
          Sign Out
        </button>
      </div>
    </div>
  );
};
export default Header;