import { client } from "../../../lib/apollo";
import { gql } from "@apollo/client";
import { ProductListContainer } from "../../../components/ProductList/ProductListContainer";
import Hero from "../../../components/Hero";

const page = ({ data, totalProducts, bestsellerProducts }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Hero />
      <ProductListContainer
        products={data.allProducts}
        totalProducts={totalProducts}
        bestsellerProducts={bestsellerProducts}
      />
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
        bestseller
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

  const bestsellerQuery = gql`
    query MyQuery {
      bestsellerProducts: allProducts(filter: { bestseller: { eq: "true" } }) {
        name
        id
        slug
        bestseller
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

  const bestData = await client.query({
    query: bestsellerQuery,
  });

  return {
    props: {
      data,
      bestsellerProducts: bestData.data.bestsellerProducts,
      totalProducts: data._allProductsMeta.count,
    },
  };
}

export default page;
