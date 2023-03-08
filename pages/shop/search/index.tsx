import React from "react";
import { ProductListContainer } from "../../../components/ProductList/ProductListContainer";

import { client } from "../../../lib/apollo";
import { gql } from "@apollo/client";
import Hero from "../../../components/Hero";

const SearchPage = ({ data, totalProductNumber }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <ProductListContainer
        products={data}
        totalProducts={totalProductNumber}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  const newRegex = (input) => {
    const queryString = input
      .split(" ")
      .map((term) => `(?=.*${term})`)
      .join("");
    return `^${queryString}.*`;
  };

  const regexPattern = newRegex(context.query.query);

  const query = gql`
    query MyQuery($regexPattern: String!, $skip: IntType, $first: IntType) {
      _allProductsMeta(
        filter: {
          name: { matches: { pattern: $regexPattern, caseSensitive: false } }
        }
      ) {
        count
      }
      paginatedSearchProducts: allProducts(
        filter: {
          name: { matches: { pattern: $regexPattern, caseSensitive: false } }
        }
        first: $first
        skip: $skip
      ) {
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

  const skip = 15 * (context.query.page - 1);

  const { data } = await client.query({
    query,
    variables: {
      regexPattern,
      first: 15,
      skip,
    },
  });

  console.log(data);

  return {
    props: {
      data: data.paginatedSearchProducts,
      totalProductNumber: data._allProductsMeta.count,
    },
  };
}

export default SearchPage;
