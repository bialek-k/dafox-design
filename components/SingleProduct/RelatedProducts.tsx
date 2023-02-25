import React from "react";
import Link from "next/link";

import { motion } from "framer-motion";
import { ProductList } from "../ProductList/ProductList";

const RelatedProducts = ({ relatedCategoryProducts, relatedLinkData }) => {
  return (
    <div className="container my-12">
      <h2 className="text-2xl font-bold text-center mb-6">
        Products from{" "}
        <span className="text-yellow-500 text-3xl">
          {" "}
          {relatedCategoryProducts[0].category[0].name}
        </span>{" "}
        category
      </h2>
      <div className="wrapper flex justify-center">
        <ProductList queryProducts={relatedCategoryProducts} />
      </div>
      <div className="action flex justify-center mb-4">
        <Link
          href={`/shop/category?filter=${relatedLinkData[0].name}&id=${relatedLinkData[0].id}&page=1`}
          className="w-1/2 px-8 h-12 drop-shadow-md"
        >
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-500 px-3 py-2 text-white rounded-md cursor-pointer"
          >
            See more from this category
          </motion.a>
        </Link>
      </div>
    </div>
  );
};

export default RelatedProducts;
