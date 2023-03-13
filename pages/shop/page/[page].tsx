import { client } from "../../../lib/apollo";
import { gql } from "@apollo/client";
import { ProductListContainer } from "../../../components/ProductList/ProductListContainer";
import { Hero } from "../../../components/HeroSection/Hero";
import {
  getBestsellerProducts,
  getLimitedOfferProducts,
  paginatedProductLists,
} from "../../../lib/DatocmsApiCall";
import { ListSettings } from "../../../components/ListSettings/ListSettings";

import { PageTitle } from "../../../components/PageTitle";
import { Quote } from "../../../components/Quote";
import { ContactForm } from "../../../components/Form/ContactForm";
import { ElfsightWidget } from "react-elfsight-widget";
import { SpecialOffersContainer } from "../../../components/ProductList/SpecialOffers/SpecialOffersContainer";
import { Divider } from "@mui/material";

const page = ({
  paginatedProducts,
  totalProducts,
  bestsellerProducts,
  limitedOfferProducts,
}) => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <Hero />
      <PageTitle />
      <ListSettings />
      {limitedOfferProducts.length > 0 && (
        <div className="bg-neutral-100 w-full my-6">
          <SpecialOffersContainer
            products={limitedOfferProducts}
            title="Exclusive Steering Wheels"
            subtitle="Upgrade your driving experience with our exclusive steering wheels, available in limited supply. Made with high-quality automotive leather or alcantara. 
            Our premium steering wheels offer both style and comfort. Don't miss out - shop now while stocks last!"
          />
        </div>
      )}
      {bestsellerProducts.length > 0 && (
        <div className="bg-neutral-100 w-full my-6">
          <SpecialOffersContainer
            products={bestsellerProducts}
            title="Bestseller Steering Wheels"
            subtitle="Our best-selling car steering wheels are the most frequently chosen products appreciated by customers for their quality, comfort, and attractive design. Made from high-quality materials such as leather, alcantara, and carbon fiber, they add a luxurious touch to any vehicle. These are your favorite gems that our customers frequently recommend and cherish."
          />
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
  const limitedOfferProducts = await getLimitedOfferProducts();

  return {
    props: {
      paginatedProducts,
      bestsellerProducts,
      limitedOfferProducts,
      totalProducts: paginatedProducts.data._allProductsMeta.count,
    },
  };
}

export default page;
