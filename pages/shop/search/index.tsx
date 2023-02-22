import React from "react";
import ProductList from "../../../components/ProductList";
import Hero from "../../../components/Hero";

import { getSearchQuery } from "../../../utilities/getSearchQuery";

import { client } from "../../../lib/apollo";
import { gql } from "@apollo/client";

import { filterQuerProducts } from "../../../utilities/filterQueryProducts";

const SearchPage = ({ data, totalProductNumber }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* <Hero /> */}
      <div>
        <ProductList products={data} totalProducts={totalProductNumber} />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const searchQuery = `(${getSearchQuery(context.query.query)})`;

  const query = gql`
    query MyQuery($pattern: String!, $skip: IntType, $first: IntType) {
      allProducts(
        filter: { name: { matches: { pattern: $pattern } } }
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

  const { data } = await client.query({
    query,
    variables: {
      pattern: searchQuery,
      first: 100,
      skip: 0,
    },
  });
  const queryArray = context.query.query.split(" ");

  const filteredArr = data.allProducts.filter((obj) => {
    return queryArray.every((str) =>
      obj.name.toLowerCase().includes(str.toLowerCase())
    );
  });

  return {
    props: {
      data: filteredArr,
      totalProductNumber: filteredArr.length,
    },
  };
}

export default SearchPage;

/*
 const simplifyString = (name) => {
    const regex = /[(]|[)]|[/]/g;
    const substr = "";
    return name.replace(regex, substr.trim());
  };

  const filon = data.Paginated.filter((prod) => {
    return queryArray.every((query) => {
      return simplifyString(prod.name)
        .toLowerCase()
        .includes(query.toLowerCase());
    });
  });
*/
