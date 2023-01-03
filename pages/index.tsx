import React, { useEffect, useContext } from "react";
import Welcome from "../components/Welcome";

import { client } from "../lib/apollo";
import { allProductsQuery, heroImagesQuery } from "../lib/queries";

import { Store } from "../store/Store";

const Home = ({ data, heroImagesArr }): React.ReactElement => {
  const { dispatch } = useContext(Store);

  useEffect(() => {
    dispatch({
      type: "SET_ALL_PRODUCTS",
      payload: data.allProducts,
    });
  }, [dispatch, data]);

  return (
    <>
      <Welcome heroImagesArr={heroImagesArr} />
    </>
  );
};

export async function getStaticProps() {
  const { data } = await client.query(allProductsQuery);
  const heroImages = await client.query(heroImagesQuery);

  const heroImagesArr = heroImages.data.heroSection.heroGallery;

  return {
    props: {
      data,
      heroImagesArr,
    },
  };
}

export default Home;
