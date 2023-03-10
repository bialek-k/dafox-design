import React from "react";

import { client } from "../../../lib/apollo";
import { gql } from "@apollo/client";
import { ProductListContainer } from "../../../components/ProductList/ProductListContainer";

const CategoryPage = ({ data, totalProductNumber, bestsellerProducts }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <ProductListContainer
        products={data}
        totalProducts={totalProductNumber}
        bestsellerProducts={bestsellerProducts}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  const query = gql`
    query MyQuery($allIn: [ItemId], $first: IntType, $skip: IntType) {
      _allProductsMeta {
        count
      }
      Products_count: allProducts(
        filter: { category: { allIn: $allIn } }
        first: "100"
      ) {
        id
      }

      Paginated: allProducts(
        filter: { category: { allIn: $allIn } }
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

  const another = 15 * (context.query.page - 1);

  const { data } = await client.query({
    query,
    variables: { allIn: context.query.id, first: 15, skip: another },
  });

  const bestData = await client.query({
    query: bestsellerQuery,
  });

  const count = data.Products_count.length;

  return {
    props: {
      data: data.Paginated,
      bestsellerProducts: bestData.data.bestsellerProducts,
      totalProductNumber: count,
    },
  };
}

export default CategoryPage;
