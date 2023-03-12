import { ProductListContainer } from "../../components/ProductList/ProductListContainer";
import { client } from "../../lib/apollo";
import { Hero } from "../../components/HeroSection/Hero";
import { paginatedProductLists } from "../../lib/DatocmsApiCall";

const Page = ({ products, totalProductNumber }): React.ReactElement => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Hero />
      <ProductListContainer
        products={products}
        totalProducts={totalProductNumber}
      />
    </div>
  );
};

export async function getStaticProps() {
  const paginatedProducts = await client.query(paginatedProductLists(0));

  return {
    props: {
      products: paginatedProducts.data.allProducts,
      totalProductNumber: paginatedProducts.data._allProductsMeta.count,
    },
  };
}
export default Page;
