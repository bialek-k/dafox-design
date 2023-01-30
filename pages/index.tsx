import React, { useEffect, useContext } from "react";
import Welcome from "../components/Welcome";

import { client } from "../lib/apollo";
import { allProductsQuery, heroImagesQuery } from "../lib/queries";
import ProductList from "../components/ProductList";

import { Store } from "../store/Store";
import { getAllProducts } from "../lib/DatocmsApiCall";

const Home = ({ data, heroImagesArr, products }): React.ReactElement => {
  const { dispatch, state } = useContext(Store);

  useEffect(() => {
    dispatch({
      type: "SET_ALL_PRODUCTS",
      payload: products,
    });
  }, [dispatch, products]);

  return (
    <div className="flex flex-col justify-center items-center">
      <Welcome heroImagesArr={heroImagesArr} />
      <h1 className="text-3xl font-bold mt-12">Shop</h1>
      <ProductList products={products} />
    </div>
  );
};

export async function getStaticProps() {
  const heroImages = await client.query(heroImagesQuery);
  const heroImagesArr = heroImages.data.heroSection.heroGallery;

  const products = await getAllProducts();

  return {
    props: {
      heroImagesArr,
      products,
    },
  };
}

export default Home;
