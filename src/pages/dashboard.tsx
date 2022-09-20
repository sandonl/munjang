import NextLink from "next/link";
import Header from "../components/Header";

const dashboard = () => {
  const dashboardButton =
    "px-6 py-4 m-3 rounded-md bg-purple-200 text-2xl text-center font-bold hover:bg-purple-100 duration-300 w-56";

  return (
    <>
      <Header />
      <div className="center-items">
        <div className="text-5xl font-bold text-white">
          What would you like to do today?
        </div>
        <div className="p-2" />
        <NextLink href={"/reviewcards"}>
          <a className={dashboardButton}>
            <span> Review Cards </span>
          </a>
        </NextLink>
        <NextLink href={"/newcards"}>
          <a className={dashboardButton}>
            <span> Add New Cards </span>
          </a>
        </NextLink>
      </div>
    </>
  );
};
export default dashboard;
