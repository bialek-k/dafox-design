import React, { useEffect, useContext } from "react";
import { gql } from "@apollo/client";
import ProductList from "../../components/ProductList";
import { useRouter } from "next/router";
import { Store } from "../../store/Store";
import { client } from "../../lib/apollo";

const allProductsQuery = gql`
  query AllProducts($first: IntType, $skip: IntType) {
    _allProductsMeta {
      count
    }
    allCategories {
      id
      series
      name
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

const Shop = ({ data }): React.ReactElement => {
  const { dispatch } = useContext(Store);
  const products = data.allProducts;
  const router = useRouter();

  const categories = products
    .map((prod) => prod.category)
    .flat()
    .sort()
    .reduce((finalArray, current) => {
      let obj = finalArray.find((item) => item.name === current.name);
      return obj ? finalArray : finalArray.concat([current]);
    }, []);

  const existingCategories = categories
    .map((category) => category.series)
    .filter((item, index, arr) => arr.indexOf(item) === index);

  let id = 1;
  const convertSeriesToDisplay = (categories, seriesName) => {
    let seriesItems = categories
      .filter((cat) => cat.series === seriesName)
      .map((s) => s.name);

    return {
      name: seriesName,
      id: id++,
      series: [...seriesItems],
    };
  };

  const finalCategories = existingCategories
    .map((item) => convertSeriesToDisplay(categories, item))
    .sort((a, b) => (a.name < b.name ? -1 : 1));

  useEffect(() => {
    dispatch({
      type: "SET_ALL_PRODUCTS",
      payload: products,
    });
  }, [dispatch, products]);

  return (
    <div className="container mx-auto py-20 mb-20">
      <div>
        <ProductList
          products={products}
          convertedSeriesData={finalCategories}
        />
      </div>
      <div className="flex gap-5 w-full items-center justify-center mt-20">
        <button
          className="px-4 py-2 border-2 rounded-lg  border-yellow-500 font-bold"
          onClick={() =>
            router.push({
              pathname: "/shop",
              query: { page: (Number(router.query.page) + -1).toString() },
            })
          }
        >
          PREV PAGE
        </button>
        <button
          className="px-4 py-2 border-2 rounded-lg  border-yellow-500 font-bold"
          onClick={() =>
            router.push({
              pathname: "/shop",
              query: { page: (Number(router.query.page) + 1).toString() },
            })
          }
        >
          NEXT PAGE
        </button>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: allProductsQuery,
    variables: { first: 3, skip: 0 },
  });

  return {
    props: {
      data,
    },
  };
}

export default Shop;
