import React from "react";

import { Image as DatoImage, StructuredText } from "react-datocms";

interface AccessoryItemProps {
  name: string;
  shortDescription: any;
  image: any;
  price: number;
  onlyInUE: boolean;
}

export const AccessoryItem = ({
  name,
  shortDescription,
  image,
  price,
  onlyInUE,
}: AccessoryItemProps) => {
  return (
    <div className="bg-neutral-100 rounded-md shadow-lg p-2 flex gap-2 ">
      <div className="image w-48  ">
        <DatoImage
          data={image}
          className="aspect-square rounded-md shadow-md "
          layout="responsive"
        />
      </div>
      <div className="content flex flex-col justify-between ">
        <div className="title flex flex-col gap-2">
          <p className="font-bold">{name}</p>
          <p className="text-sm">
            <StructuredText data={shortDescription} />
          </p>
        </div>
        <div className="price flex gap-2  md:items-start w-full">
          <p className="">
            Price:{" "}
            <strong className="font-bold text-xl text-secondary">
              ${price}
            </strong>
          </p>
        </div>
        {onlyInUE ? <p>Avaible only in UE</p> : null}
      </div>
    </div>
  );
};
