import React from "react";
import { ProductListContainer } from "../../../components/ProductList/ProductListContainer";

import { client } from "../../../lib/apollo";
import { gql } from "@apollo/client";
import Hero from "../../../components/Hero";

const SearchPage = ({ data, totalProductNumber, bestsellerProducts }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* <Hero /> */}
      <ProductListContainer
        products={data}
        totalProducts={totalProductNumber}
        bestsellerProducts={bestsellerProducts}
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

  const bestsellerQuery = gql`
    query MyQuery {
      bestsellerProducts: allProducts(filter: { bestseller: { eq: "true" } }) {
        name
        id
        slug
        bestseller
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
            bgColor
            title
            aspectRatio
            height
            sizes
            src
            srcSet
            webpSrcSet
            width
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

  const bestData = await client.query({
    query: bestsellerQuery,
  });

  return {
    props: {
      data: data.paginatedSearchProducts,
      bestsellerProducts: bestData.data.bestsellerProducts,

      totalProductNumber: data._allProductsMeta.count,
    },
  };
}

export default SearchPage;
