import React from "react";

import { SpecialOffersContainer } from "./SpecialOffersContainer";

export const BestsellerProducts = ({ bestsellerProducts }) => {
  return (
    <SpecialOffersContainer
      products={bestsellerProducts}
      title="Bestseller Steering Wheels"
      subtitle="Our best-selling car steering wheels are the most frequently chosen products appreciated by customers for their quality, comfort, and attractive design. Made from high-quality materials such as leather, alcantara, and carbon fiber, they add a luxurious touch to any vehicle. These are your favorite gems that our customers frequently recommend and cherish."
    />
  );
};
