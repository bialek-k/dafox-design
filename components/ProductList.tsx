import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { Store } from "../store/Store";

import Product from "./Product";
import ProductFilter from "./ProductFilter";
import MobileProductFilter from "./MobileProductFilter";
import SortingProducts from "./SortingProducts";

import { PaginationWrapper } from "./PaginationWrapper";

import Link from "next/link";

import { getFinalCategory } from "../utilities/categoryHandler";
import { getSortingMethod } from "../utilities/getSortingMethod";
import { paginate } from "../utilities/paginate";

import { motion } from "framer-motion";

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

const ProductList = ({ products }): React.ReactElement => {
  const [selected, setSelected] = useState("all");
  const [sortingMethod, setSortingMethod] = useState("Price: low to high");
  const filtered_products = getSortingMethod(sortingMethod, products);
  const { dispatch } = useContext(Store);

  useEffect(() => {
    setCurrentPage(1);
  }, [selected]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const onPageChange = (_, page) => {
    setCurrentPage(page);
  };

  const finalCategories = getFinalCategory(products);

  useEffect(() => {
    dispatch({
      type: "SET_ALL_PRODUCTS",
      payload: products,
    });
  }, [dispatch, products]);

  const displayFilteredProduct = () => {
    if (selected === "all") {
      return [...filtered_products];
    } else {
      return filtered_products.filter((product: ProductProps) =>
        product.category.some((category) => category.name === selected)
      );
    }
  };

  const paginatedProducts = paginate(
    displayFilteredProduct(),
    currentPage,
    pageSize
  );

  const displayProduct = paginatedProducts.map((product: ProductProps) => (
    <Link href={`shop/${product.slug}`} key={product.id}>
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
    <div className="container flex justify-center my-24">
      <ProductFilter
        convertedSeriesData={finalCategories}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="wrapper">
        <div className="px-2 lg:px-6 flex flex-col md:flex-row mx-4 gap-4 mb-4 lg:justify-between items-center ">
          <p className="text-neutral-600 w-full">
            There is <strong>{displayFilteredProduct().length}</strong>
            {displayFilteredProduct().length > 1
              ? " products"
              : " product"}{" "}
            availble
          </p>
          <MobileProductFilter
            convertedSeriesData={finalCategories}
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
        <PaginationWrapper
          items={displayFilteredProduct().length}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default ProductList;

// const displayFilteredProduct = () => {
//   let products = [];
//   if (selected === "all") {
//     products = [...filtered_products];
//   } else {
//     const existingProduct = filtered_products.filter(
//       (product: ProductProps) =>
//         product.category.some((category) => category.name === selected)
//     );
//     products.push(...existingProduct);
//   }
//   return [...products];
// };
