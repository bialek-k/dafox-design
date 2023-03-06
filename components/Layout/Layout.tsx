import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer";
import BottomMenu from "./BottomMenu";

const Layout = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  return (
    <>
      <Header />
      <main className="dark:bg-neutral-800 dark:text-white">{children}</main>
      <div id="backdrop-root" />
      <BottomMenu />
      <Footer />
    </>
  );
};

export default Layout;
