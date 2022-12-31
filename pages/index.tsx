import React, { useEffect, useContext } from "react";
import Welcome from "../components/Welcome";

import { client } from "../lib/apollo";
import { allProductsQuery } from "../lib/queries";

import { Store } from "../store/Store";

const Home = ({ data }): React.ReactElement => {
  const { dispatch } = useContext(Store);

  useEffect(() => {
    dispatch({
      type: "SET_ALL_PRODUCTS",
      payload: data.allProducts,
    });
  }, [dispatch, data]);

  return (
    <>
      <Welcome />
    </>
  );
};

export async function getStaticProps() {
  const { data } = await client.query(allProductsQuery);

  return {
    props: {
      data,
    },
  };
}

export default Home;
