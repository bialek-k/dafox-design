import {
  getAllPathsProducts,
  getSingleProduct,
} from "../../lib/DatocmsApiCall";

const SingleProduct = ({ singleProduct }) => {
  console.log(singleProduct);
  return (
    <div className="container mx-auto py-20 mb-20">
      <div>
        <h1>{singleProduct.name}</h1>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const slugs = await getAllPathsProducts();

  let paths = [];
  slugs.allProducts.map((s) => paths.push(`/shop/${s.slug}`));
  console.log(paths);

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

export default SingleProduct;
