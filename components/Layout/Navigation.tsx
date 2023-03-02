import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";
import { Store } from "../../store/Store";

import { scrollToElement } from "../../utilities/scrollToElement";

import cartShopping from "../../assets/cart-shopping.svg";

const Navigation = (): React.ReactElement => {
  const { state } = useContext(Store);
  const { cart } = state;
  const router = useRouter();

  const underline =
    'after:content-[""] after:block after:w-full after:h-1 after:bg-yellow-300';

  return (
    <nav>
      <ul className=" sm:flex flex-row gap-4 text-white items-center ">
        <li className="flex gap-2 items-center">
          <button
            name="productList"
            className="hover:scale-125 ease-in-out duration-150"
            onClick={(e) => scrollToElement(e)}
          >
            <FaSearch className="text-yellow-500 pointer-events-none" />
          </button>
          <Link href="/shop/page/1">
            <a
              className={`${router.pathname === "/shop" && underline} relative`}
            >
              Shop
            </a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a
              className={`${
                router.pathname === "/about" && underline
              } relative`}
            >
              About us
            </a>
          </Link>
        </li>
        <li>
          <Link href="/faq">
            <a
              className={`${router.pathname === "/faq" && underline} relative`}
            >
              FAQ
            </a>
          </Link>
        </li>

        <li>
          <Link href="/contact">
            <a
              className={`${
                router.pathname === "/contact" && underline
              } relative`}
            >
              Contact
            </a>
          </Link>
        </li>

        <li>
          <Link href="/cart">
            <div className=" flex items-center  ">
              <div className="icon flex flex-row relative ">
                <button className="px-2">
                  <Image
                    src={cartShopping}
                    width={45}
                    height={45}
                    className=""
                    alt="shopping cart icon"
                  />
                </button>
                {cart.cartItems.length > 0 && (
                  <div className="w-7 h-7 flex items-center justify-center rounded-full border-1 border-white absolute bottom-0 right-0 bg-white">
                    <span className="font-bold text-xl text-yellow-500">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
