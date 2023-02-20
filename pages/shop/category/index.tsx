import React from "react";

import { client } from "../../../lib/apollo";
import { gql } from "@apollo/client";
import { convertCategories } from "../../../utilities/categoryHandler copy";
import Hero from "../../../components/Hero";
import ProductList from "../../../components/ProductList";

const CategoryPage = ({ data, totalProductNumber }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <ProductList products={data} totalProducts={totalProductNumber} />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const query = gql`
    query MyQuery($allIn: [ItemId]) {
      _allProductsMeta {
        count
      }
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
  `;

  const { data } = await client.query({
    query,
    variables: { allIn: context.query.id },
  });

  return {
    props: {
      data: data.allProducts,
      totalProductNumber: data._allProductsMeta.count,
    },
  };
}

export default CategoryPage;
