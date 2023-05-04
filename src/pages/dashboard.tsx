import Head from "next/head";
import NextLink from "next/link";
import Header from "../components/Header";
import Layout from "../components/Layout";

const dashboard = () => {
  return (
    <>
      <Layout title={"Dashboard"}>
        <Header />
        <div className="center-items">
          <div className="text-5xl font-bold text-white">
            What would you like to do today?
          </div>
          <div className="p-3" />
          <NextLink href={"/reviewcards"}>
            <a className="btn w-56">
              <span> Review Cards </span>
            </a>
          </NextLink>
          <div className="p-3" />
          <NextLink href={"/newcards"}>
            <a className="btn w-56">
              <span> Add New Cards </span>
            </a>
          </NextLink>
        </div>
      </Layout>
    </>
  );
};
export default dashboard;
