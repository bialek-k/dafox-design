import React from "react";
import { ProductListContainer } from "../../../components/ProductList/ProductListContainer";
import { client } from "../../../lib/apollo";
import { gql } from "@apollo/client";
import { ListSettings } from "../../../components/ListSettings/ListSettings";
import { PageTitle } from "../../../components/PageTitle";
import { NoProductsFound } from "../../../components/NoProductsFound";
import { SpecialOffersContainer } from "../../../components/ProductList/SpecialOffers/SpecialOffersContainer";
import { GrayBackgroundWrapper } from "../../../components/UI/GrayBackgroundWrapper";
import {
  getBestsellerProducts,
  getLimitedOfferProducts,
} from "../../../lib/DatocmsApiCall";

const SearchPage = ({
  data,
  totalProductNumber,
  bestsellerProducts,
  limitedOfferProducts,
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      {data.length > 0 ? <PageTitle /> : <NoProductsFound />}
      <ListSettings />
      <ProductListContainer
        products={data}
        totalProducts={totalProductNumber}
      />
      {bestsellerProducts.length > 0 && (
        <SpecialOffersContainer
          products={bestsellerProducts}
          title="Bestseller Steering Wheels"
          subtitle="Our best-selling car steering wheels are the most frequently chosen products appreciated by customers for their quality, comfort, and attractive design. Made from high-quality materials such as leather, alcantara, and carbon fiber, they add a luxurious touch to any vehicle. These are your favorite gems that our customers frequently recommend and cherish."
        />
      )}
      {limitedOfferProducts.length > 0 && (
        <GrayBackgroundWrapper>
          <SpecialOffersContainer
            products={limitedOfferProducts}
            title="Exclusive Steering Wheels"
            subtitle="Upgrade your driving experience with our exclusive steering wheels, available in limited supply. Made with high-quality automotive leather or alcantara. 
            Our premium steering wheels offer both style and comfort. Don't miss out - shop now while stocks last!"
          />
        </GrayBackgroundWrapper>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const newRegex = (input) => {
    const queryString = input
      .split(" ")
      .map((term) => `(?=.*${term})`)
      .join("");
    return `^${queryString}.*`;
  };

  const regexPattern = newRegex(context.query.query);

  const query = gql`
    query MyQuery($regexPattern: String!, $skip: IntType, $first: IntType) {
      _allProductsMeta(
        filter: {
          name: { matches: { pattern: $regexPattern, caseSensitive: false } }
        }
      ) {
        count
      }
      paginatedSearchProducts: allProducts(
        filter: {
          name: { matches: { pattern: $regexPattern, caseSensitive: false } }
        }
        first: $first
        skip: $skip
      ) {
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
            src
            webpSrcSet
          }
        }
      }
    }
  `;

  const skip = 15 * (context.query.page - 1);

  const { data } = await client.query({
    query,
    variables: {
      regexPattern,
      first: 15,
      skip,
    },
  });

  const limitedOfferProducts = await getLimitedOfferProducts();
  const bestsellerProducts = await getBestsellerProducts();

  return {
    props: {
      data: data.paginatedSearchProducts,
      limitedOfferProducts,
      bestsellerProducts,
      totalProductNumber: data._allProductsMeta.count,
    },
  };
}

export default SearchPage;
