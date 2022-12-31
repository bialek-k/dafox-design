import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer";

const Layout = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <div id="backdrop-root" />
      <Footer />
    </>
  );
};

export default Layout;
