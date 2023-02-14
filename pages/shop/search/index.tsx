import React from "react";
import ProductList from "../../../components/ProductList";
import Hero from "../../../components/Hero";

import { client } from "../../../lib/apollo";
import { gql } from "@apollo/client";

const SearchPage = ({ data, totalProductNumber }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Hero />
      <div>
        <ProductList products={data} totalProducts={totalProductNumber} />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const searchQuery = `(${context.query.query})`;

  const query = gql`
    query MyQuery($pattern: String!) {
      _allProductsMeta {
        count
      }
      allProducts(filter: { name: { matches: { pattern: $pattern } } }) {
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

  const { data } = await client.query({
    query,
    variables: { pattern: searchQuery },
  });

  return {
    props: {
      data: data.allProducts,
      totalProductNumber: data._allProductsMeta.count,
    },
  };
}

export default SearchPage;
