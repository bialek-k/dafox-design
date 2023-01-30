import { useEffect, useContext } from "react";
import SingleProductItem from "../components/SingleProduct/SingleProductItem";
import { singleProductQuery, allProductsQuery } from "./queries";
import { client } from "./apollo";
import { gql } from "@apollo/client";

import { useRouter } from "next/router";

import { Store } from "../store/Store";

const SingleProduct = ({
  productData,
  allProductsData,
}): React.ReactElement => {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  useEffect(() => {
    dispatch({
      type: "SET_PRODUCT_DATA",
      payload: { ...productData },
    });
  }, [dispatch, productData]);

  if (state.ctxProductData.id !== undefined) {
    return <div>{<SingleProductItem allProductsData={allProductsData} />}</div>;
  }
};

export default SingleProduct;

// export const getServerSideProps = async ({ params }) => {
//   const product = await client.query(singleProductQuery(params));
//   const allProducts = await client.query(allProductsQuery);

//   return {
//     props: {
//       productData: product.data.product,
//       params,
//       allProductsData: allProducts.data.allProducts,
//     },
//   };
// };
