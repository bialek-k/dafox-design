import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { Store } from "../store/Store";

import Product from "./Product";
import SortingProducts from "./SortingProducts";
import Link from "next/link";

import FilterProducts from "./FilterProducts";
import { getSortingMethod } from "../utilities/getSortingMethod";
import { motion } from "framer-motion";
import { Pagination } from "./Pagination";
import { AmountOfProducts } from "./AmountOfProducts";
import { SearchProducts } from "./SearchProducts";

interface ProductProps {
  name?: string;
  title?: string;
  price?: number;
  data?: any;
  promotion?: any;
  freeShipping?: any;
  category?: any;
  slug?: string;
  id?: any;
}

const ProductList = ({ products, totalProducts }): React.ReactElement => {
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
    <div className="container flex justify-center my-24">
      <div className="wrapper px-6">
        <SearchProducts />
        <div className="flex flex-col md:flex-row gap-4 mb-4 lg:justify-end items-center ">
          <FilterProducts />
          <SortingProducts
            sortingMethod={sortingMethod}
            setSortingMethod={setSortingMethod}
          />
        </div>
        <div className="grid gap-6 grid-cols-1 max-w-5xl sm:grid-cols-2 md:grid-cols-4 mx-auto">
          {queryProducts().map((product: ProductProps) => (
            <Link href={`/shop/${product.slug}`} key={product.id}>
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
          ))}
        </div>
        {router.query.page && (
          <Pagination totalProducts={totalProducts} pageSize={pageSize} />
        )}
      </div>
    </div>
  );
};

export default ProductList;

/*
  <SortingProducts
            setSortingMethod={setSortingMethod}
            sortingMethod={sortingMethod}
          />
        
*/
