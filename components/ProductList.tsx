import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { Store } from "../store/Store";
import { sendSearchQuery } from "../utilities/sendSearchQuery";

import Product from "./Product";
import ProductFilter from "./ProductFilter";
import MobileProductFilter from "./MobileProductFilter";
import SortingProducts from "./SortingProducts";
import Link from "next/link";

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
  const [selected, setSelected] = useState("all");
  const [sortingMethod, setSortingMethod] = useState("Price: low to high");
  const finalCategories = getFinalCategory(products);
  const router = useRouter();
  const {
    state: { searchProducts },
  } = useContext(Store);

  const queryProducts = () => {
    if (searchProducts.length) {
      return searchProducts;
    } else {
      return products;
    }
  };

  const pageSize = 15;
  const pages = totalProducts / pageSize;
  const currentPage = Number(router.query.page);

  return (
    <div className="container flex justify-center my-24">
      <div className="wrapper px-6">
        <SearchProducts />
        <div className="flex flex-col md:flex-row gap-4 mb-4 lg:justify-between items-center ">
          <AmountOfProducts
            products={products}
            totalProducts={totalProducts}
            currentPage={currentPage}
            pageSize={pageSize}
          />
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
        {!searchProducts && (
          <Pagination totalProducts={totalProducts} pageSize={pageSize} />
        )}
      </div>
    </div>
  );
};

export default ProductList;

/*

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [selected]);

  // const [currentPage, setCurrentPage] = useState(1);
  // const pageSize = 20;

  // const onPageChange = (_, page) => {
  //   setCurrentPage(page);
  // };

  
  // const paginatedProducts = paginate(
  //   displayFilteredProduct(),
  //   currentPage,
  //   pageSize
  // );


    const filtered_products = getSortingMethod(sortingMethod, products);
  const { dispatch } = useContext(Store);

  
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
*/
