import { useContext, useEffect } from "react";
import { SingleProductItem } from "../../components/SingleProduct/SingleProductItem";
import { Store } from "../../store/Store";
import { client } from "../../lib/apollo";
import { gql } from "@apollo/client";

import {
  getAllPathsProducts,
  getSingleProduct,
} from "../../lib/DatocmsApiCall";

const SingleProductPage = ({ singleProduct, relatedProducts }) => {
  return (
    <SingleProductItem
      singleProduct={singleProduct}
      relatedProducts={relatedProducts}
    />
  );
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

  const categoryId = singleProduct.category.map((id) => id.id);
  const query = gql`
    query MyQuery($allIn: [ItemId]) {
      allProducts(filter: { category: { allIn: $allIn } }) {
        name
        id
        slug
        price
        freeShipping
        promotion
        inStock
        category {
          id
          series
          name
        }
        image {
          responsiveImage {
            alt
            base64
            src
            webpSrcSet
          }
        }
      }
    }
  `;
  const relatedProducts = await client.query({
    query,
    variables: { allIn: categoryId[0] },
  });

  return {
    props: {
      singleProduct,
      relatedProducts: relatedProducts.data.allProducts.slice(0, 4),
    },
  };
}

export default SingleProductPage;
