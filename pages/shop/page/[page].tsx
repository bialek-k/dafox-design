import React from "react";
import {
  getTotalProductsNumber,
  config,
  getPaginatedProductsSummaries,
} from "../../../lib/queryApi";
import ProductList from "../../../components/ProductList";

const page = ({ products }) => {
  return (
    <div className="container mx-auto py-20 mb-20">
      <div>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const totalProductsNumber = await getTotalProductsNumber();
  const totalPages = totalProductsNumber / config.pagination.pageSize;

  const paths = [];

  for (let page = 1; page <= totalPages; page++) {
    paths.push({ params: { page: page.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { allProducts } = await getPaginatedProductsSummaries(params.page);

  return {
    props: {
      products: allProducts,
      currentPage: params.page,
    },
  };
}

export default page;
