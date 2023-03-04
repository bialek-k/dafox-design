import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Divider } from "@mui/material";
import { Store } from "../../store/Store";
import SortingProducts from "../SortingProducts";
import FilterProducts from "../FilterProducts";
import { getSortingMethod } from "../../utilities/getSortingMethod";
import { Pagination } from "../Pagination";
import { AmountOfProducts } from "../AmountOfProducts";
import { SearchProducts } from "../SearchProducts";
import { ProductList } from "./ProductList";

import { ElfsightWidget } from "react-elfsight-widget";

import { ContactForm } from "../Form/ContactForm";

export const ProductListContainer = ({
  products,
  totalProducts,
}): React.ReactElement => {
  const [sortingMethod, setSortingMethod] = useState("Price: low to high");
  const {
    state: { searchProducts, filterCategory, filterQuery },
  } = useContext(Store);
  const [name, setName] = useState("");

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

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center my-24">
        <div className="description text-center mb-16">
          <h1 className=" text-3xl font-bold">No items in this category</h1>
          <p className="text-neutral-600">use search or change categories</p>
        </div>
        <div className="flex gap-5 w-full">
          <SearchProducts showFilter />
          <FilterProducts />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full justify-center mb-12" id="productList">
      <div className="container mx-auto my-20 ">
        <div className="title flex items-center flex-col gap-6 w-full text-justify mb-28 px-6">
          <h1 className="text-center text-3xl font-bold">
            Custom Steering Wheels
          </h1>
          <p className="text-justify md:text-center text-sm md:text-base md:w-2/3  text-primary-dark dark:text-primary-darkMode tracking-wider">
            Upgrade your vehicle&apos;s interior with a custom steering wheel
            that reflects your personal style and enhances your driving
            experience. Our product list features a wide range of custom
            steering wheels designed to meet the{" "}
            <strong className="text-secondary">unique</strong> preferences of
            every driver. From classic leather-wrapped wheels to sleek carbon
            fiber designs, our collection offers something for{" "}
            <strong className="text-secondary">everyone.</strong>
          </p>
        </div>
        <div className="px-6">
          <SearchProducts showFilter />
          <div className="flex flex-col my-12 gap-4 md:gap-2 md:justify-end lg:flex-row ">
            <FilterProducts />
            <SortingProducts
              sortingMethod={sortingMethod}
              setSortingMethod={setSortingMethod}
            />
          </div>
          <div className="filter mt-12">
            <AmountOfProducts
              amountOfProducts={products.length}
              totalProducts={totalProducts}
              pageSize={pageSize}
            />
            {listNameDisplay()}
          </div>
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
        </div>
        <Divider className="dark:invert" />
        <div className="description flex justify-center my-6 px-6">
          <p className="text-justify md:text-center text-sm md:text-base md:w-2/3 text-primary-dark dark:text-primary-darkMode tracking-wider">
            Not only do custom steering wheels add a touch of style to your
            vehicle&apos;s interior, they can also improve your{" "}
            <strong className="text-yellow-500">grip</strong> and{" "}
            <strong className="text-yellow-500">control</strong> on the road. A
            properly fitted custom steering wheel can provide a better grip and
            more comfortable driving position, reducing fatigue and{" "}
            <strong className="text-yellow-500">enhancing </strong>
            your driving experience.
          </p>
        </div>
        <Divider className="dark:invert" />
      </div>
      <div className="contact">
        <ContactForm
          title="Need a super specific steering wheel?"
          subtitle="Leave us a message and we'll get in touch ASAP."
        />
      </div>
      <div className="reviews dark:bg-white py-32 overflow-hidden">
        <ElfsightWidget widgetID={process.env.ELFSIGHT_WIDGET_ID} />
      </div>
    </div>
  );
};
