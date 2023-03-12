import { client } from "../../../lib/apollo";
import { gql } from "@apollo/client";
import { ProductListContainer } from "../../../components/ProductList/ProductListContainer";
import { Hero } from "../../../components/HeroSection/Hero";
import {
  getBestsellerProducts,
  paginatedProductLists,
} from "../../../lib/DatocmsApiCall";
import { BestsellerContainer } from "../../../components/ProductList/Bestseller/BestsellerContainer";
import { ListSettings } from "../../../components/ListSettings/ListSettings";

import { PageTitle } from "../../../components/PageTitle";
import { Quote } from "../../../components/Quote";
import { ContactForm } from "../../../components/Form/ContactForm";
import { ElfsightWidget } from "react-elfsight-widget";

const page = ({ paginatedProducts, totalProducts, bestsellerProducts }) => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <Hero />
      <PageTitle />
      <ListSettings />
      {bestsellerProducts.length > 0 && (
        <div className="bg-neutral-100 w-full my-6">
          <BestsellerContainer bestsellerProducts={bestsellerProducts} />
        </div>
      )}
      <ProductListContainer
        products={paginatedProducts.data.allProducts}
        totalProducts={totalProducts}
      />
      <div className="w-full mb-12">
        <Quote />
      </div>
      <ContactForm
        title="Need a super specific steering wheel?"
        subtitle="Leave us a message and we'll get in touch ASAP."
      />
      <div className="reviews dark:bg-white w-full py-12 mb-6 overflow-hidden">
        <ElfsightWidget widgetID={process.env.ELFSIGHT_WIDGET_ID} />
      </div>
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
  const another = 15 * (context.params.page - 1);

  const paginatedProducts = await client.query(paginatedProductLists(another));
  const bestsellerProducts = await getBestsellerProducts();

  return {
    props: {
      paginatedProducts,
      bestsellerProducts,
      totalProducts: paginatedProducts.data._allProductsMeta.count,
    },
  };
}

export default page;
