import { useState, useContext } from "react";
import { useRouter } from "next/router";

import { Divider } from "@mui/material";

import { Store } from "../../store/Store";

import Product from "../Product";
import SortingProducts from "../SortingProducts";
import Link from "next/link";

import FilterProducts from "../FilterProducts";
import { getSortingMethod } from "../../utilities/getSortingMethod";
import { motion } from "framer-motion";
import { Pagination } from "../Pagination";
import { AmountOfProducts } from "../AmountOfProducts";
import { SearchProducts } from "../SearchProducts";

import { ProductList } from "./ProductList";

export const ProductListContainer = ({
  products,
  totalProducts,
}): React.ReactElement => {
  const [sortingMethod, setSortingMethod] = useState("Price: low to high");
  const {
    state: { searchProducts },
  } = useContext(Store);
  const router = useRouter();

  const queryProducts = () => {
    if (searchProducts.length) {
      const prod = getSortingMethod(sortingMethod, searchProducts);
      return prod;
    } else {
      return getSortingMethod(sortingMethod, products);
    }
  };
  const pageSize = 15;

  if (!products.length) {
    return (
      <div className="container flex flex-col items-center justify-center my-24">
        <div className="description text-center mb-16">
          <h1 className=" text-3xl font-bold">No items in this category</h1>
          <p className="text-neutral-600">use search or change categories</p>
        </div>
        <div className="flex gap-5 w-full">
          <SearchProducts />
          <FilterProducts />
        </div>
      </div>
    );
  }

  return (
    <div className="container flex flex-col justify-center mb-12 ">
      <div className="title w-full my-16">
        <h1 className="text-center text-3xl font-bold">
          Custom Steering Wheels
        </h1>
      </div>
      <div className="wrapper px-6 ">
        <SearchProducts />
        <div className="flex flex-col lg:flex-row lg:items-center ">
          <AmountOfProducts
            amountOfProducts={products.length}
            totalProducts={totalProducts}
            currentPage={Number(router.query.page)}
            pageSize={pageSize}
          />

          <div className="flex flex-col md:flex-row gap-4 my-6 ">
            <FilterProducts />
            <SortingProducts
              sortingMethod={sortingMethod}
              setSortingMethod={setSortingMethod}
            />
          </div>
        </div>
        <div className=" my-4   dark:invert">
          <Divider />
        </div>
        <ProductList queryProducts={queryProducts()} />
        {router.pathname === "/shop/page/[page]" && (
          <Pagination
            url={"/shop/page/"}
            totalProducts={totalProducts}
            pageSize={pageSize}
          />
        )}
        {router.pathname === "/shop/category" && (
          <Pagination
            url={`/shop/category?filter=${router.query.filter}&id=${router.query.id}&page=`}
            totalProducts={totalProducts}
            pageSize={pageSize}
          />
        )}
        {router.pathname === "/shop/search" && (
          <Pagination
            url={`/shop/search?query=${router.query.query}&page=`}
            totalProducts={totalProducts}
            pageSize={pageSize}
          />
        )}
      </div>
    </div>
  );
};