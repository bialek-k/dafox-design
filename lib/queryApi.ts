import { client } from "./apollo";
import { gql } from "@apollo/client";

export const config = {
  pagination: {
    pageSize: 2,
  },
};

export const getTotalProductsNumber = async () => {
  const totalProductsNumberQuery = gql`
    query AllProducts {
      _allProductsMeta {
        count
      }
    }
  `;
  const {
    data: {
      _allProductsMeta: { count },
    },
  } = await client.query({ query: totalProductsNumberQuery });
  return count;
};

export const getPaginatedProductsSummaries = async (page) => {
  const skipMultipler = page === 1 ? 0 : page - 1;
  const skip =
    skipMultipler > 0 ? config.pagination.pageSize * skipMultipler : 0;

  const allProductsQuery = gql`
    query AllProducts($first: IntType, $skip: IntType) {
      allCategories {
        id
        series
        name
      }
      allProducts(first: $first, skip: $skip) {
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

  const { data } = await client.query({
    query: allProductsQuery,
    variables: { first: config.pagination.pageSize, skip: skip },
  });
  return data;
};
