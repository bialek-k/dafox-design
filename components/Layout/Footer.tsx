import React from "react";

import { IconContext } from "react-icons";
import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";

import { useRef } from "react";
import { useRouter } from "next/router";

import Image from "next/image";
import logoWhite from "../../assets/dafox_logo_white.png";
import Link from "next/link";

const Footer = (): React.ReactElement => {
  const ref = useRef();
  const router = useRouter();

  return (
    <div className="bg-black mt-auto w-full items-center border-t border-neutral-800 py-8">
      <div className="container mx-auto flex flex-col justify-center gap-12 md:flex-row md:justify-between md:py-12 ">
        <div className="information flex flex-col items-center">
          <p className="text-white font-bold tracking-widest text-xl mb-6">
            Information
          </p>
          <Image
            src={logoWhite}
            width={135}
            height={50}
            alt="dafoxdesign logo"
          />
          <div className="text-white/90 text-center">
            <a href="mailto:info@dafoxdesign.com" className="text-lg">
              info@dafoxdesign.com
            </a>
            <p>Al. Piłsudskiego 23a</p>
            <p>Rzeszów 35-074</p>
            <p>Poland</p>
          </div>
        </div>
        <div className="navigation flex flex-col items-center">
          <p className="text-white font-bold tracking-widest text-xl mb-6">
            Navigation
          </p>
          <nav>
            <ul className=" flex md:flex-col md:items-center gap-4 text-white/90">
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link href="/shop">
                  <a>Shop</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a>About us</a>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <a>FAQ</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a>Contact</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="social flex flex-col items-center">
          <p className="text-white font-bold tracking-widest text-xl mb-6">
            Social
          </p>
          <IconContext.Provider value={{ color: "white", size: "40" }}>
            <div className="flex gap-6">
              <a className="cursor-pointer">
                <Link href="https://www.facebook.com/profile.php?id=100063642040324">
                  <BsFacebook />
                </Link>
              </a>
              <a className="cursor-pointer">
                <Link href="https://www.instagram.com/dafox_design">
                  <BsInstagram />
                </Link>
              </a>
              <a className="cursor-pointer">
                <Link href="https://www.youtube.com">
                  <BsYoutube />
                </Link>
              </a>
            </div>
          </IconContext.Provider>
          <div className="policy mt-10">
            <Link href="/privacy-policy">
              <a className="text-white/50 dark:text-white/50">Privacy Policy</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
