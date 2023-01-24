import React, { useState } from "react";
import Product from "./Product";
import Link from "next/link";

import { motion } from "framer-motion";
import ProductFilter from "./ProductFilter";
import MobileProductFilter from "./MobileProductFilter";
import SortingProducts from "./SortingProducts";

import { getSortingMethod } from "../utilities/getSortingMethod";

const ProductList = ({ products, convertedSeriesData }): React.ReactElement => {
  const [selected, setSelected] = useState("all");
  const [sortingMethod, setSortingMethod] = useState("Price: low to high");
  const filtered_products = getSortingMethod(sortingMethod, products);

  const displayFilteredProduct = () => {
    let products = [];
    if (selected === "all") {
      products = [...filtered_products];
    } else {
      const existingProduct = filtered_products.filter((product) =>
        product.category.some((category) => category.name === selected)
      );
      products.push(...existingProduct);
    }
    return [...products];
  };

  const displayProduct = displayFilteredProduct().map((product) => (
    <Link href={`steeringwheels/${product.slug}`} key={product.id}>
      <a>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="dark:border-2 dark:rounded-md dark:border-neutral-800"
        >
          <Product
            data={product}
            title={product.name}
            price={product.price}
            promotion={product.promotion}
            freeShipping={product.freeShipping}
          />
        </motion.div>
      </a>
    </Link>
  ));

  return (
    <div className=" container flex justify-center">
      <ProductFilter
        convertedSeriesData={convertedSeriesData}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="wrapper">
        <div className="py- px-2 lg:px-6 flex mx-4 gap-4 mb-4 lg:justify-end ">
          <MobileProductFilter
            convertedSeriesData={convertedSeriesData}
            selected={selected}
            setSelected={setSelected}
          />
          <SortingProducts
            setSortingMethod={setSortingMethod}
            sortingMethod={sortingMethod}
          />
        </div>
        <div className="grid gap-6 grid-cols-1 max-w-5xl sm:grid-cols-2 md:grid-cols-3 mx-auto px-6 ">
          {displayProduct}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
