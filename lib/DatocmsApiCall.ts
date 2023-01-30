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

const slugQuery = gql`
  query MyQuery {
    allProducts {
      slug
    }
  }
`;
const singleProductQuery = (params) => {
  return {
    query: gql`
      query MyQuery($slug: String) {
        product(filter: { slug: { eq: $slug } }) {
          id
          name
          price
          freeShipping
          promotion
          slug
          inStock
          boki {
            price
            name
          }
          category {
            name
          }
          shortDescription {
            value
          }
          description {
            value
          }
          goraIDol {
            name
            price
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
          gallery {
            id
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
    `,
    variables: { slug: params.slug },
  };
};

export const getAllProducts = async () => {
  const { data } = await client.query({ query: allProducts });
  return data.allProducts;
};

export const getAllPathsProducts = async () => {
  const { data } = await client.query({ query: slugQuery });
  return data;
};

export const getSingleProduct = async (slug) => {
  const { data } = await client.query(singleProductQuery(slug));
  return data.product;
};
