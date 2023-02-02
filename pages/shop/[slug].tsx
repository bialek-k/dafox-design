import { useContext, useEffect } from "react";
import { SingleProductItem } from "../../components/SingleProduct/SingleProductItem";
import { Store } from "../../store/Store";

import {
  getAllPathsProducts,
  getSingleProduct,
} from "../../lib/DatocmsApiCall";

const SingleProductPage = ({ singleProduct }) => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    dispatch({
      type: "SET_PRODUCT_DATA",
      payload: { ...singleProduct },
    });
  }, [dispatch, singleProduct]);

  if (state.ctxProductData.id !== undefined) {
    return <SingleProductItem />;
  }
};

export async function getStaticPaths() {
  const slugs = await getAllPathsProducts();

  let paths = [];
  slugs.allProducts.map((s) => paths.push(`/shop/${s.slug}`));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const singleProduct = await getSingleProduct(params.slug);

  return {
    props: {
      singleProduct,
    },
  };
}

export default SingleProductPage;
