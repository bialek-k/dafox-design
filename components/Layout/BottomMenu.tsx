import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { FaHome, FaQuestion, FaComment, FaSearch } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";

import { scrollToElement } from "../../utilities/scrollToElement";

const BottomMenu = () => {
  const router = useRouter();

  return (
    <section className="md:hidden bg-neutral-800 fixed bottom-0 right-0 w-full h-16 z-10">
      <div className="content text-white justify-between px-4 items-center h-full flex">
        <Link href="/shop/page/1">
          <a
            className={`${
              router.pathname.includes("/shop") && "text-secondary"
            } flex flex-col items-center px-2`}
          >
            <div className="icon h-5">
              <FaHome className="w-full h-full pointer-events-none" />
            </div>
            <p className="text-xs">Shop</p>
          </a>
        </Link>
        <Link href="/about">
          <a
            className={`${
              router.pathname === "/about" && "text-secondary"
            } flex flex-col items-center px-2`}
          >
            <div className="icon h-5">
              <BsPeople className="w-full h-full pointer-events-none" />
            </div>
            <p className="text-xs">About us</p>
          </a>
        </Link>

        <Link href="/faq">
          <a
            className={`${
              router.pathname === "/faq" && "text-secondary"
            } flex flex-col items-center px-2`}
          >
            <div className="icon h-5">
              <FaQuestion className="w-full h-full pointer-events-none" />
            </div>
            <p className="text-xs">Faq</p>
          </a>
        </Link>
        <Link href="/contact">
          <a
            className={`${
              router.pathname === "/contact" && "text-secondary"
            } flex flex-col items-center px-2`}
          >
            <div className="icon h-5">
              <FaComment className="w-full h-full pointer-events-none" />
            </div>
            <p className="text-xs">Contact</p>
          </a>
        </Link>
      </div>
    </section>
  );
};

export default BottomMenu;
