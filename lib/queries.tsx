import { gql } from "@apollo/client";

export const singleProductQuery = (params) => {
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

export const allProductsQuery = {
  query: gql`
    query MyQuery {
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
  `,
};

export const termsQuery = {
  query: gql`
    query MyQuery {
      term {
        termsAndConditions {
          value
        }
      }
    }
  `,
};

export const allCategories = {
  query: gql`
    query MyQuery {
      allCategories {
        id
        series
        name
      }
    }
  `,
};

export const seriesCategory = {
  query: gql`
    query MyQuery {
      allOneSeries {
        name
      }
      allTwoSeries {
        name
      }
      allThreeSeries {
        name
      }
      allFourSeries {
        name
      }
      allFiveSeries {
        name
      }
      allXSeries {
        name
      }
    }
  `,
};

export const aboutQuery = {
  query: gql`
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
  `,
};

export const AllFaqsQuery = {
  query: gql`
    query MyQuery {
      allFaqs {
        id
        question
        answer
      }
    }
  `,
};

export const privacyPolicyQuery = {
  query: gql`
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
  `,
};

export const heroImagesQuery = {
  query: gql`
    query MyQuery {
      heroSection {
        heroGallery {
          responsiveImage {
            alt
            aspectRatio
            base64
            bgColor
            height
            sizes
            srcSet
            src
            title
            webpSrcSet
            width
          }
        }
      }
    }
  `,
};
