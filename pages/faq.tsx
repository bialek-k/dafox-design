import React, { useEffect, useContext } from "react";
import FaqContent from "../components/FaqContent";

import { client } from "../lib/apollo";
import { AllFaqsQuery } from "../lib/queries";

import { Store } from "../store/Store";

const Faq = ({ data }) => {
  const { dispatch } = useContext(Store);

  useEffect(() => {
    dispatch({
      type: "SET_FAQ_CONTENT",
      payload: data,
    });
  }, [dispatch, data]);

  return <FaqContent data={data} />;
};

export async function getStaticProps() {
  const { data } = await client.query(AllFaqsQuery);

  return {
    props: { data },
  };
}

export default Faq;
