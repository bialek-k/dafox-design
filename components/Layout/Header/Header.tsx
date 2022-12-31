import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Navigation from "../Navigation";
import { useRouter } from "next/router";

import { motion, AnimatePresence } from "framer-motion";

import logoWhite from "../../../assets/dafox_logo_white.png";
import logoBlack from "../../../assets/dafox_logo_black.png";
import HamburgerButton from "./HamburgerButton";
import MobileMenu from "./MobileMenu";
import CloseHamButton from "./CloseHamButton";
import Search from "./Search/Search";

const Header = (): React.ReactElement => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Dafox Design</title>
        <meta name="description" content="Custom Steering Wheels" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-black px-5">
        <div className=" container mx-auto">
          <header className="flex items-center justify-between py-4 ">
            <div>
              <Link href="/">
                <a>
                  <Image
                    src={logoWhite}
                    width={135}
                    height={50}
                    alt="dafoxdesign logo"
                  />
                </a>
              </Link>
            </div>
            <div className="search">
              <Search />
            </div>
            <div className="hidden md:flex">
              <Navigation />
            </div>
            <div className="hamburger  md:hidden z-50 ">
              {openMobileMenu ? (
                <CloseHamButton setOpenMobileMenu={setOpenMobileMenu} />
              ) : (
                <HamburgerButton setOpenMobileMenu={setOpenMobileMenu} />
              )}
            </div>

            <AnimatePresence>
              {openMobileMenu && (
                <motion.div
                  className="absolute bg-black shadow-lg w-full h-full z-40 top-0 left-0"
                  initial={{ x: "-100vw", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-100vw", opacity: 0 }}
                  transition={{
                    x: { duration: 0.5 },
                    default: { ease: "linear" },
                  }}
                  onClick={() =>
                    setTimeout(() => {
                      setOpenMobileMenu(false);
                    }, 500)
                  }
                >
                  <MobileMenu setOpenMobileMenu={setOpenMobileMenu} />
                </motion.div>
              )}
            </AnimatePresence>
          </header>
        </div>
      </div>
    </>
  );
};

export default Header;
