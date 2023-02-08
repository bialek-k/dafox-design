const Home = () => {
  return <div></div>;
};

export default Home;

// import React, { useEffect, useContext } from "react";

// import { gql } from "@apollo/client";

// import { client } from "../lib/apollo";
// import { heroImagesQuery } from "../lib/queries";
// import ProductList from "../components/ProductList";

// import { Store } from "../store/Store";
// import { getAllProducts } from "../lib/DatocmsApiCall";
// import Hero from "../components/Hero";
// import Link from "next/link";

// const Home = ({
//   heroImagesArr,
//   products,
//   totalProductNumber,
// }): React.ReactElement => {
//   // const { dispatch } = useContext(Store);
//   const pageSize = 15;

//   const getNavigationLinks = () => {
//     const totalPages = totalProductNumber / pageSize + 1;
//     let arr = [];
//     for (let i = 1; i < totalPages; i++) {
//       arr.push(i);
//     }
//     return arr;
//   };

//   // useEffect(() => {
//   //   dispatch({
//   //     type: "SET_ALL_PRODUCTS",
//   //     payload: products,
//   //   });
//   // }, [dispatch, products]);

//   return (
//     <div className="flex flex-col justify-center items-center">
//       <Hero heroImagesArr={heroImagesArr} />
//       {/* <ProductList products={products} /> */}
//       <div>
//         {products.map((p) => (
//           <p key={p.name}>{p.name}</p>
//         ))}
//       </div>
//       <div className="navigation flex gap-3 my-12">
//         {getNavigationLinks().map((pageNumber) => {
//           return (
//             <div key={pageNumber} className="cursor-pointer">
//               <Link href={`/shop/page/${pageNumber}`}>
//                 <div>
//                   <p className="text-2xl">{pageNumber}</p>
//                 </div>
//               </Link>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export async function getStaticProps() {
//   const heroImages = await client.query(heroImagesQuery);
//   const heroImagesArr = heroImages.data.heroSection.heroGallery;

//   // const products = await getAllProducts();

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
//     variables: { first: 15, skip: 15 },
//   });

//   return {
//     props: {
//       heroImagesArr,
//       products: data.allProducts,
//       totalProductNumber: data._allProductsMeta.count,
//     },
//   };
// }

// export default Home;
