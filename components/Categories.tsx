import React from "react";

import { motion } from "framer-motion";

import Link from "next/link";

const Categories = (): React.ReactElement => {
  return (
    <section className="py-32 ">
      <div className="container mx-auto flex justify-center items-center">
        <h2 className="mb-12 text-3xl font-bold">categories</h2>
      </div>
      <div className="container mx-auto flex flex-col items-center md:flex-row justify-center gap-5 px-6 md:px-24 ">
        <motion.div
          className="steeringwheel bg-black h-52 w-full md:w-1/2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}>
          <Link href="/shop/steeringwheels">
            <motion.button
              className="w-full h-full text-xl md:text-4xl font-bold text-white "
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>
              Steering Wheels
            </motion.button>
          </Link>
        </motion.div>
        <motion.div
          className="accessories bg-black h-52 w-full md:w-1/2 "
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}>
          <Link href="/shop/accessories">
            <motion.button
              className="w-full h-full text-xl md:text-4xl font-bold text-white "
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>
              Accessories
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
