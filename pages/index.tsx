import React, { useEffect, useContext } from "react";
import { gql } from "@apollo/client";
import { ProductListContainer } from "../components/ProductList/ProductListContainer";
import { client } from "../lib/apollo";
import { Store } from "../store/Store";
import Hero from "../components/Hero";

const Shop = ({ products, totalProductNumber }): React.ReactElement => {
  // const { dispatch, state } = useContext(Store);
  // useEffect(() => {
  //   dispatch({
  //     type: "SET_ALL_PRODUCTS",
  //     payload: products,
  //   });
  // }, [dispatch, products]);

  // console.log(state.cart);
  return (
    <div className="flex flex-col justify-center items-center">
      <p>INDEX</p>
      <Hero />
      {/* <ProductListContainer
        currentPage={1}
        products={products}
        totalProducts={totalProductNumber}
      /> */}
    </div>
  );
};

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

export default Shop;
