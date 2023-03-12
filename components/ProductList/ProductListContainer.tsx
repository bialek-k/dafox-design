import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Store } from "../../store/Store";

import { Divider } from "@mui/material";

import { getSortingMethod } from "../../utilities/getSortingMethod";
import { Pagination } from "../Pagination/Pagination";
import { AmountOfProducts } from "./AmountOfProducts";
import { ProductList } from "./ProductList";

export const ProductListContainer = ({
  products,
  totalProducts,
}): React.ReactElement => {
  const {
    state: { searchProducts, filterCategory, filterQuery, storedSortingMethod },
    dispatch,
  } = useContext(Store);
  const router = useRouter();

  const queryProducts = () => {
    if (searchProducts.length) {
      const prod = getSortingMethod(storedSortingMethod, searchProducts);
      return prod;
    } else {
      return getSortingMethod(storedSortingMethod, products);
    }
  };
  const pageSize = 15;

  useEffect(() => {
    if (router.asPath === "/shop/page/1") {
      dispatch({
        type: "REMOVE_FILTER_QUERY",
      });
    }
  }, [router, dispatch]);

  const listNameDisplay = () => {
    if (filterQuery) {
      return (
        <h2 className="text-xl">
          Search: <strong className="font-bold">{filterQuery}</strong>
        </h2>
      );
    } else {
      return (
        <h2 className="text-xl">
          Category: <strong className="font-bold">{filterCategory.name}</strong>
        </h2>
      );
    }
  };

  return (
    <div className="w-full justify-center py-6" id="productList">
      <div className="mx-auto">
        <section className="products container mx-auto px-6">
          <AmountOfProducts
            amountOfProducts={products.length}
            totalProducts={totalProducts}
            pageSize={pageSize}
          />
          {listNameDisplay()}
          <div className=" my-4 dark:invert">
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
        </section>
      </div>
    </div>
  );
};
