import {
  getAllPathsProducts,
  getSingleProduct,
} from "../../lib/DatocmsApiCall";

const singleProductPage = ({ singleProduct }) => {
  console.log(singleProduct);
  return (
    <div className="container mx-auto py-20 mb-20">
      <div>
        <h1>siema</h1>
        {/* <ProductList products={products} /> */}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const slugs = await getAllPathsProducts();

  let paths = [];
  slugs.allProducts.map((s) => paths.push(`/shop/${s.slug}`));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const singleProduct = await getSingleProduct(params.slug);

  return {
    props: {
      singleProduct,
    },
  };
}

export default singleProductPage;
