import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import NextLink from "next/link";

const Header = () => {
  const { data: session } = useSession({ required: true });

  return (
    <div
      className=" bg-purple-300 p-3 h-16 top-0 w-full 
    flex justify-between items-center"
    >
      <NextLink href={"/dashboard"}>
        <a className="text-gray-700 text-2xl font-extrabold px-5">
          MUNJANG <span className="text-purple-500"> 문장 </span>
        </a>
      </NextLink>
      <div className="flex items-center">
        <NextLink href={"/dashboard"}>
          <a
            className="p-4 px-4 py-2 mx-1 rounded-md
         bg-purple-300 hover:bg-purple-200  duration-300 font-semibold"
          >
            Dashboard
          </a>
        </NextLink>
        <a
          className="px-4 py-2 mx-1 rounded-md bg-purple-300 hover:bg-purple-200  duration-300 font-semibold"
          href="https://papago.naver.com/"
          target="_blank"
          rel="noreferrer"
        >
          Papago (파파고)
        </a>
        <div className="font-bold mx-2">{session?.user?.name}</div>

        <div className="h-7 w-7 mx-2 relative">
          <Image
            src={session?.user?.image!}
            alt="User image"
            layout="fill"
            className="rounded-full"
          />
        </div>

        <button
          className="px-4 py-2 mx-1 rounded-md bg-purple-300 hover:bg-purple-200  duration-300 font-semibold"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
export default Header;
