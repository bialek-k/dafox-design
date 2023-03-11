import { client } from "../../../lib/apollo";
import { ProductListContainer } from "../../../components/ProductList/ProductListContainer";

import { GrayBackgroundWrapper } from "../../../components/UI/GrayBackgroundWrapper";
import { ElfsightWidget } from "react-elfsight-widget";

import {
  getBestsellerProducts,
  productsByCategoryQuery,
} from "../../../lib/DatocmsApiCall";
import { PageTitle } from "../../../components/PageTitle";
import { ListSettings } from "../../../components/ListSettings/ListSettings";
import { BestsellerContainer } from "../../../components/ProductList/Bestseller/BestsellerContainer";

const CategoryPage = ({ data, totalProductNumber, bestsellerProducts }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <PageTitle />
      <ListSettings />
      <ProductListContainer
        products={data}
        totalProducts={totalProductNumber}
      />
      <GrayBackgroundWrapper>
        <BestsellerContainer bestsellerProducts={bestsellerProducts} />
      </GrayBackgroundWrapper>

      <div className="reviews dark:bg-white py-12 mb-6 overflow-hidden">
        <ElfsightWidget widgetID={process.env.ELFSIGHT_WIDGET_ID} />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const nextPageOfProducts = 15 * (context.query.page - 1);

  const productsByCategory = await client.query(
    productsByCategoryQuery(context.query.id, nextPageOfProducts)
  );

  const bestsellerProducts = await getBestsellerProducts();
  const count = productsByCategory.data.Products_count.length;

  return {
    props: {
      data: productsByCategory.data.Paginated,
      bestsellerProducts,
      totalProductNumber: count,
    },
  };
}

export default CategoryPage;
