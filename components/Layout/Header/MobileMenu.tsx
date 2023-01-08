import React, { useContext } from "react";
import Image from "next/image";

import { Store } from "../../../store/Store";

import Link from "next/link";
import { motion } from "framer-motion";
import cartShopping from "../../../assets/cart-shopping.svg";

const MobileMenu = ({ setOpenMobileMenu }) => {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <nav className="mt-24">
      <ul className=" flex flex-col items-center gap-2 text-white font-bold text-xl ">
        <div
          className="flex justify-center w-full text-center py-4 my-6 border-y-2 border-yellow-500"
          onClick={() => setOpenMobileMenu(false)}
        >
          <Link href="/cart">
            <div className="flex items-center gap-2">
              <p>Shopping Cart</p>
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
                  <div className="w-7 h-7 rounded-full border-1 border-white absolute bottom-0 right-0 bg-white">
                    <span className="font-bold  text-yellow-500">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
        <Link href="/">
          <motion.li
            whileTap={{ scale: 0.85 }}
            onClick={() =>
              setTimeout(() => {
                setOpenMobileMenu(false);
              }, 1000)
            }
            className="hover:text-orange-300 bg-yellow-500 w-full text-center py-4"
          >
            <a>Home</a>
          </motion.li>
        </Link>
        <Link href="/shop">
          <motion.li
            whileTap={{ scale: 0.85 }}
            onClick={() =>
              setTimeout(() => {
                setOpenMobileMenu(false);
              }, 1000)
            }
            className="hover:text-orange-300 bg-yellow-500 w-full text-center py-4"
          >
            <a>Shop</a>
          </motion.li>
        </Link>
        <Link href="/about">
          <motion.li
            whileTap={{ scale: 0.85 }}
            onClick={() =>
              setTimeout(() => {
                setOpenMobileMenu(false);
              }, 1000)
            }
            className="hover:text-orange-300 bg-yellow-500 w-full text-center py-4"
          >
            <a>About us</a>
          </motion.li>
        </Link>
        <Link href="/faq">
          <motion.li
            whileTap={{ scale: 0.85 }}
            onClick={() =>
              setTimeout(() => {
                setOpenMobileMenu(false);
              }, 1000)
            }
            className="hover:text-orange-300 bg-yellow-500 w-full text-center py-4"
          >
            <a>FAQ</a>
          </motion.li>
        </Link>

        <Link href="/contact">
          <motion.li
            whileTap={{ scale: 0.85 }}
            onClick={() =>
              setTimeout(() => {
                setOpenMobileMenu(false);
              }, 1000)
            }
            className="hover:text-orange-300 bg-yellow-500 w-full text-center py-4"
          >
            <a>Contact</a>
          </motion.li>
        </Link>
      </ul>
    </nav>
  );
};

export default MobileMenu;
