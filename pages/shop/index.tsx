import ProductList from "../../components/ProductList";

import { getAllProducts } from "../../lib/DatocmsApiCall";

// Old
import {
  getTotalProductsNumber,
  getPaginatedProductsSummaries,
  config,
} from "../../lib/queryApi";

const Shop = ({ products, newProducts }): React.ReactElement => {
  console.log(newProducts);
  return (
    <div className="container mx-auto py-20 mb-20">
      <div>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const { allProducts, allCategories } = await getPaginatedProductsSummaries(1);
  const totalProductsNumber = await getTotalProductsNumber();
  const totalPages = totalProductsNumber / config.pagination.pageSize;

  const newProducts = await getAllProducts();

  return {
    props: {
      newProducts,
      products: allProducts,
      allCategories,
      totalPages,
      currentPage: "1",
    },
  };
}

export default Shop;
