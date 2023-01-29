import { useState, useEffect, useContext } from "react";
import Product from "./Product";
import Link from "next/link";
import { Store } from "../store/Store";

import { useRouter } from "next/router";

import { motion } from "framer-motion";
import ProductFilter from "./ProductFilter";
import MobileProductFilter from "./MobileProductFilter";
import SortingProducts from "./SortingProducts";

import { getSortingMethod } from "../utilities/getSortingMethod";

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
  const router = useRouter();

  const categories = products
    .map((prod) => prod.category)
    .flat()
    .sort()
    .reduce((finalArray, current) => {
      let obj = finalArray.find((item) => item.name === current.name);
      return obj ? finalArray : finalArray.concat([current]);
    }, []);

  const existingCategories = categories
    .map((category) => category.series)
    .filter((item, index, arr) => arr.indexOf(item) === index);

  let id = 1;
  const convertSeriesToDisplay = (categories, seriesName) => {
    let seriesItems = categories
      .filter((cat) => cat.series === seriesName)
      .map((s) => s.name);

    return {
      name: seriesName,
      id: id++,
      series: [...seriesItems],
    };
  };

  const finalCategories = existingCategories
    .map((item) => convertSeriesToDisplay(categories, item))
    .sort((a, b) => (a.name < b.name ? -1 : 1));

  useEffect(() => {
    dispatch({
      type: "SET_ALL_PRODUCTS",
      payload: products,
    });
  }, [dispatch, products]);

  const displayFilteredProduct = () => {
    let products = [];
    if (selected === "all") {
      products = [...filtered_products];
    } else {
      const existingProduct = filtered_products.filter(
        (product: ProductProps) =>
          product.category.some((category) => category.name === selected)
      );
      products.push(...existingProduct);
    }
    return [...products];
  };

  const displayProduct = displayFilteredProduct().map(
    (product: ProductProps) => (
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
    )
  );

  return (
    <div className=" container flex justify-center">
      <ProductFilter
        convertedSeriesData={finalCategories}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="wrapper">
        <div className="py- px-2 lg:px-6 flex mx-4 gap-4 mb-4 lg:justify-end ">
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
        <div className="flex gap-5 w-full items-center justify-center mt-20">
          <Link href={`${router.asPath}/${"2"}`}>NEXT PAGE</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
