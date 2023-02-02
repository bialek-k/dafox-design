import React, { useEffect, useContext } from "react";
import Welcome from "../components/Welcome";

import { client } from "../lib/apollo";
import { heroImagesQuery } from "../lib/queries";
import ProductList from "../components/ProductList";

import { Store } from "../store/Store";
import { getAllProducts } from "../lib/DatocmsApiCall";

const Home = ({ heroImagesArr, products }): React.ReactElement => {
  const { dispatch } = useContext(Store);

  useEffect(() => {
    dispatch({
      type: "SET_ALL_PRODUCTS",
      payload: products,
    });
  }, [dispatch, products]);

  return (
    <div className="relative flex flex-col justify-center items-center">
      <Welcome heroImagesArr={heroImagesArr} />
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
