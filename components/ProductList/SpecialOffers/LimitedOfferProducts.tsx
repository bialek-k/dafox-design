import React from "react";
import { SpecialOffersContainer } from "./SpecialOffersContainer";

export const LimitedOfferProducts = ({ limitedOfferProducts }) => {
  return (
    <SpecialOffersContainer
      products={limitedOfferProducts}
      title="Exclusive Steering Wheels"
      subtitle="Upgrade your driving experience with our exclusive steering wheels, available in limited supply. Made with high-quality automotive leather or alcantara. 
      Our premium steering wheels offer both style and comfort. Don't miss out - shop now while stocks last!"
    />
  );
};
