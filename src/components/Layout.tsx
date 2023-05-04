import Head from "next/head";
import React, { ReactNode } from "react";

interface LayoutProps {
  title: string;
  children: ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title> 문장 - MUNJANG {title} </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};
export default Layout;
