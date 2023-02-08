import { client } from "../../../lib/apollo";
import { gql } from "@apollo/client";
import { heroImagesQuery } from "../../../lib/queries";

import { useRouter } from "next/router";

import { PaginationWrapper } from "../../../components/PaginationWrapper";

import ProductList from "../../../components/ProductList";

import Link from "next/link";

import Hero from "../../../components/Hero";

const page = ({ data, currentPage, totalProducts }) => {
  // const totalProductNumber = data._allProductsMeta.count;
  // const pageSize = 15;
  // const getNavigationLinks = () => {
  //   const totalPages = totalProductNumber / pageSize + 1;
  //   let arr = [];
  //   for (let i = 1; i < totalPages; i++) {
  //     arr.push(i);
  //   }
  //   return arr;
  // };

  // const paginationButtons = getNavigationLinks().map((pageNumber) => {
  //   return (
  //     <Link key={pageNumber} href={`/shop/page/${pageNumber}`}>
  //       <div
  //         className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100`}
  //       >
  //         <p className="text-md">{pageNumber}</p>
  //       </div>
  //     </Link>
  //   );
  // });

  return (
    <div className="flex flex-col justify-center items-center">
      <Hero />
      {/* <div className="navigation flex gap-5 my-12">{paginationButtons}</div> */}
      <div>
        <ProductList
          products={data.allProducts}
          currentPage={currentPage}
          totalProducts={totalProducts}
        />
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const countQuery = gql`
    query AllProducts {
      _allProductsMeta {
        count
      }
    }
  `;

  const countData = await client.query({ query: countQuery });
  const count = countData.data._allProductsMeta.count;

  // count = 45
  const pageSize = 15;

  const totalPages = count / pageSize + 1;
  let arr = [];
  for (let i = 1; i < totalPages; i++) {
    arr.push(`/shop/page/${i}`);
  }

  return {
    paths: arr,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const paginatedProductsLists = gql`
    query AllProducts($first: IntType, $skip: IntType) {
      _allProductsMeta {
        count
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

  const another = 15 * (context.params.page - 1);

  const { data } = await client.query({
    query: paginatedProductsLists,
    variables: { first: 15, skip: another },
  });

  return {
    props: {
      data,
      currentPage: context.params.page,
      totalProducts: data._allProductsMeta.count,
    },
  };
}

export default page;
