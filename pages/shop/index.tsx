import ProductList from "../../components/ProductList";
import { client } from "../../lib/apollo";
import { gql } from "@apollo/client";
import Hero from "../../components/Hero";

const Page = ({ products, totalProductNumber }): React.ReactElement => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Hero />
      <ProductList products={products} totalProducts={totalProductNumber} />
    </div>
  );
};

export async function getStaticProps() {
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

  const { data } = await client.query({
    query: paginatedProductsLists,
    variables: { first: 15, skip: 0 },
  });

  return {
    props: {
      products: data.allProducts,
      totalProductNumber: data._allProductsMeta.count,
    },
  };
}
export default Page;
