import React from "react";
import ProductList from "../../../components/ProductList";
import Hero from "../../../components/Hero";

import { client } from "../../../lib/apollo";
import { gql } from "@apollo/client";

const index = ({ data, totalProductNumber }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p>getServerSideProps</p>
      <Hero />
      <div>
        <ProductList products={data} totalProducts={totalProductNumber} />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  // const query = context.query;

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
    query,
    variables: { pattern: context.query.query },
  });
  console.log(data);

  return {
    props: {
      data: data.allProducts,
      totalProductNumber: data._allProductsMeta.count,
    },
  };
}

// export async function getStaticProps() {
//   const paginatedProductsLists = gql`
//     query AllProducts($first: IntType, $skip: IntType) {
//       _allProductsMeta {
//         count
//       }
//       allProducts(first: $first, skip: $skip) {
//         name
//         id
//         slug
//         price
//         freeShipping
//         promotion
//         inStock
//         category {
//           id
//           series
//           name
//         }
//         image {
//           responsiveImage {
//             alt
//             base64
//             bgColor
//             title
//             aspectRatio
//             height
//             sizes
//             src
//             srcSet
//             webpSrcSet
//             width
//           }
//         }
//       }
//     }
//   `;

//   const { data } = await client.query({
//     query: paginatedProductsLists,
//     variables: { first: 15, skip: 0 },
//   });

//   return {
//     props: {
//       products: data.allProducts,
//       totalProductNumber: data._allProductsMeta.count,
//     },
//   };
// }

export default index;
