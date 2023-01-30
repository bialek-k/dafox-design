import ProductList from "../../components/ProductList";

import { gql } from "@apollo/client";
import { client } from "../../lib/apollo";
import {
  getAllProducts,
  getAllPathsProducts,
  getSingleProduct,
} from "../../lib/DatocmsApiCall";

const Shop = ({ products }): React.ReactElement => {
  return (
    <div className="container mx-auto py-20 mb-20">
      <div>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const products = await getAllProducts();

  return {
    props: {
      products,
    },
  };
}

export default Shop;
