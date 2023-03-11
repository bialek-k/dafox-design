import { SingleProductItem } from "../../components/SingleProduct/SingleProductItem";
import { client } from "../../lib/apollo";

import {
  getAllPathsProducts,
  getSingleProduct,
  getRelatedProducts,
} from "../../lib/DatocmsApiCall";

const SingleProductPage = ({ singleProduct, relatedProducts }) => {
  return (
    <SingleProductItem
      singleProduct={singleProduct}
      relatedProducts={relatedProducts}
    />
  );
};

export async function getStaticPaths() {
  const slugs = await getAllPathsProducts();

  let paths = [];
  slugs.allProducts.map((s) => paths.push(`/shop/${s.slug}`));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const singleProduct = await getSingleProduct(params.slug);
  const categoryId = singleProduct.category.map((id) => id.id);
  const relatedProducts = await client.query(getRelatedProducts(categoryId[0]));

  return {
    props: {
      singleProduct,
      relatedProducts: relatedProducts.data.allProducts.slice(0, 4),
    },
  };
}

export default SingleProductPage;
