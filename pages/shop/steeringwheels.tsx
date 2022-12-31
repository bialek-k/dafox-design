import { useEffect, useContext } from "react";

import ProductList from "../../components/ProductList";

import { Store } from "../../store/Store";
import { allProductsQuery } from "../../lib/queries";
import { client } from "../../lib/apollo";

const SteeringWheels = ({ data }): React.ReactElement => {
  const { dispatch } = useContext(Store);
  const products = data.allProducts;

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
    </div>
  );
};

export async function getStaticProps() {
  const { data } = await client.query(allProductsQuery);

  return {
    props: {
      data,
    },
  };
}

export default SteeringWheels;
