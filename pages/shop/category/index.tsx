import { client } from "../../../lib/apollo";
import { ProductListContainer } from "../../../components/ProductList/ProductListContainer";

import { GrayBackgroundWrapper } from "../../../components/UI/GrayBackgroundWrapper";
import { ElfsightWidget } from "react-elfsight-widget";

import {
  getBestsellerProducts,
  getLimitedOfferProducts,
  productsByCategoryQuery,
} from "../../../lib/DatocmsApiCall";
import { PageTitle } from "../../../components/PageTitle";
import { ListSettings } from "../../../components/ListSettings/ListSettings";
import { BestsellerProducts } from "../../../components/ProductList/SpecialOffers/BestsellerProducts";
import { LimitedOfferProducts } from "../../../components/ProductList/SpecialOffers/LimitedOfferProducts";

const CategoryPage = ({
  data,
  totalProductNumber,
  bestsellerProducts,
  limitedOfferProducts,
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <PageTitle />
      <ListSettings />
      <ProductListContainer
        products={data}
        totalProducts={totalProductNumber}
      />
      {bestsellerProducts.length > 0 && (
        <GrayBackgroundWrapper>
          <BestsellerProducts bestsellerProducts={bestsellerProducts} />
        </GrayBackgroundWrapper>
      )}
      {limitedOfferProducts.length > 0 && (
        <GrayBackgroundWrapper>
          <LimitedOfferProducts limitedOfferProducts={limitedOfferProducts} />
        </GrayBackgroundWrapper>
      )}

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
  const limitedOfferProducts = await getLimitedOfferProducts();

  const count = productsByCategory.data.Products_count.length;

  return {
    props: {
      data: productsByCategory.data.Paginated,
      bestsellerProducts,
      limitedOfferProducts,
      totalProductNumber: count,
    },
  };
}

export default CategoryPage;
