import React from "react";
import Product from "../Product";
import Link from "next/link";

import { motion } from "framer-motion";

const RelatedProducts = ({ relatedCategoryProducts }) => {
  return (
    <div className="container mt-32">
      <h2 className="text-2xl font-bold text-center mb-6">
        Product from{" "}
        <span className="text-yellow-500 text-3xl">
          {" "}
          {relatedCategoryProducts[0].category[0].name}
        </span>{" "}
        category
      </h2>
      <div className="wrapper flex justify-center">
        <div className="grid md:grid-cols-2  lg:grid-cols-4 gap-4 md:max-w-5xl ">
          {relatedCategoryProducts.map((singleProduct) => (
            <Link href={`${singleProduct.slug}`} key={singleProduct.id}>
              <a>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="dark:border-2 dark:rounded-md dark:border-neutral-800"
                >
                  <Product
                    title={singleProduct.name}
                    price={singleProduct.price}
                    data={singleProduct}
                    promotion={singleProduct.promotion}
                    freeShipping={singleProduct.freeShipping}
                  />
                </motion.div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
