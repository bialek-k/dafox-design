import React from "react";

import { StructuredText } from "react-datocms";

const ProductContent = ({ productData, increment }): React.ReactElement => {
  return (
    <div className="content ">
      <div className="title mb-8">
        <h1 className="font-bold text-2xl">{productData.name}</h1>
      </div>
      <div className="descirption mb-5 flex flex-col gap-3">
        <StructuredText data={productData.shortDescription} />
      </div>
    </div>
  );
};

export default ProductContent;
