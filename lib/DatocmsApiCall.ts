import { client } from "./apollo";
import { gql } from "@apollo/client";

const allProducts = gql`
  query AllProducts {
    allCategories {
      id
      series
      name
    }
    allProducts(first: 100) {
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

export const getAllProducts = async () => {
  const { data } = await client.query({ query: allProducts });
  return data.allProducts;
};
