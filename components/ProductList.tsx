import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { Store } from "../store/Store";

import Product from "./Product";
import ProductFilter from "./ProductFilter";
import MobileProductFilter from "./MobileProductFilter";
import SortingProducts from "./SortingProducts";
import Link from "next/link";

import FilterProducts from "./FilterProducts";

import { getFinalCategory } from "../utilities/categoryHandler";
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
  const finalCategories = getFinalCategory(products);
  const {
    state: { searchProducts },
  } = useContext(Store);

  const queryProducts = () => {
    if (searchProducts.length) {
      const prod = getSortingMethod(sortingMethod, searchProducts);
      return prod;
    } else {
      return getSortingMethod(sortingMethod, products);
    }
  };

  const pageSize = 15;
  // const currentPage = Number(router.query.page);

  return (
    <div className="container flex justify-center my-24">
      <div className="wrapper px-6">
        <SearchProducts />
        <div className="flex flex-col md:flex-row gap-4 mb-4 lg:justify-end items-center ">
          {/* <AmountOfProducts
            products={products}
            totalProducts={totalProducts}
            currentPage={currentPage}
            pageSize={pageSize}
          /> */}
          <FilterProducts finalCategories={finalCategories} />
          <SortingProducts
            setSortingMethod={setSortingMethod}
            sortingMethod={sortingMethod}
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
        {products.length >= pageSize && (
          <Pagination totalProducts={totalProducts} pageSize={pageSize} />
        )}
      </div>
    </div>
  );
};

export default ProductList;
