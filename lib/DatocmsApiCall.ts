import { client } from "./apollo";
import { gql } from "@apollo/client";

const slugQuery = gql`
  query MyQuery {
    allProducts(first: 100) {
      slug
    }
  }
`;

export const getAllPathsProducts = async () => {
  const { data } = await client.query({ query: slugQuery });
  return data;
};

const singleProductQuery = gql`
  query MyQuery($slug: String) {
    product(filter: { slug: { eq: $slug } }) {
      id
      name
      price
      freeShipping
      promotion
      slug
      inStock
      category {
        name
        id
        series
      }
      shortDescription {
        value
      }
      description {
        value
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
      accessories {
        id
        name
        shortDescription {
          value
        }
        price
        onlyInUe
        image {
          responsiveImage {
            alt
            aspectRatio
            base64
            bgColor
            height
            sizes
            src
            webpSrcSet
          }
        }
      }
    }
  }
`;

export const getSingleProduct = async (slug) => {
  const { data } = await client.query({
    query: singleProductQuery,
    variables: { slug: slug },
  });
  return data.product;
};

const bestsellerProductsQuery = gql`
  query MyQuery {
    bestsellerProducts: allProducts(filter: { bestseller: { eq: "true" } }) {
      name
      id
      slug
      bestseller
      limitedOffer
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

export const getBestsellerProducts = async () => {
  const { data } = await client.query({ query: bestsellerProductsQuery });
  return data.bestsellerProducts;
};

const limitedOfferQuery = gql`
  query MyQuery {
    limitedOffer: allProducts(filter: { limitedOffer: { eq: "true" } }) {
      name
      id
      slug
      limitedOffer
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

export const getLimitedOfferProducts = async () => {
  const { data } = await client.query({ query: limitedOfferQuery });
  return data.limitedOffer;
};

export const productsByCategoryQuery = (queryId, nextPageOfProducts) => {
  return {
    query: gql`
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
    `,
    variables: { allIn: queryId, first: 15, skip: nextPageOfProducts },
  };
};

export const paginatedProductLists = (skip) => {
  return {
    query: gql`
      query AllProducts($first: IntType, $skip: IntType) {
        _allProductsMeta {
          count
        }
        allProducts(first: $first, skip: $skip) {
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
    `,
    variables: { first: 15, skip },
  };
};

export const getRelatedProducts = (catId) => {
  return {
    query: gql`
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
    `,
    variables: { allIn: catId },
  };
};

export const searchQueryResponse = (regexp) => {
  return {
    query: gql`
      query MyQuery($regexp: String!) {
        allProducts(filter: { name: { matches: { regexp: "$regexp" } } }) {
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
    `,
    variables: { regexp },
  };
};

const allFaqsQuery = gql`
  query MyQuery {
    allFaqs {
      id
      question
      answer
    }
  }
`;

export const getALlFaqs = async () => {
  const data = await client.query({ query: allFaqsQuery });
  return data;
};

const aboutQuery = gql`
  query MyQuery {
    allAbouts {
      id
      content {
        value
        blocks {
          __typename
          ... on ImageRecord {
            id
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
          ... on PostgalleryRecord {
            id
            postimagesgallery {
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
      }
    }
  }
`;

export const getAboutData = async () => {
  const data = await client.query({ query: aboutQuery });
  return data;
};

const privacyPolicyQuery = gql`
  query MyQuery {
    privacyPolicy {
      title {
        value
      }
      content {
        value
      }
    }
  }
`;

export const getPrivacyPolicy = async () => {
  const data = await client.query({ query: privacyPolicyQuery });
  return data;
};

const termsAndConditionsQuery = gql`
  query MyQuery {
    term {
      termsAndConditions {
        value
      }
    }
  }
`;

export const getTermsAndConditins = async () => {
  const data = await client.query({ query: termsAndConditionsQuery });
  return data;
};
