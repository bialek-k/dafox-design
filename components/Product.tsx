import React from "react";

import { Image as DatoImage } from "react-datocms";

import { FaShoppingCart } from "react-icons/fa";

interface ProductProps {
  name: string;
  title: string;
  price: number;
  data: any;
  promotion: any;
  freeShipping?: any;
  category?: any;
  slug?: string;
  id?: any;
}

const Product = ({
  title,
  price,
  data,
  promotion,
  freeShipping,
}: ProductProps): React.ReactElement => {
  return (
    <div className="single-product p-4 flex flex-col justify-between ease-in-out duration-200 shadow-xl sm:h-128 rounded-md">
      <div className="content">
        <div className="photo mb-3 w-full aspect-square">
          {data?.image && (
            <DatoImage
              className="rounded-lg h-full"
              objectFit="cover"
              layout="responsive"
              data={data.image.responsiveImage}
            />
          )}
        </div>
        <div className="title font-bold text-md mb-24 md:mb-0">
          <p>{title}</p>
        </div>
      </div>
      <div className="price flex  justify-between items-end">
        <div className="flex flex-col gap-2">
          {freeShipping && (
            <p className="font-bold text-xl text-yellow-400">FREE SHIPPING</p>
          )}
          <p className="text-black/50 text-sm dark:invert">
            in stock: <span>{data.inStock}</span>
          </p>
          <div className="div flex gap-2 items-center ">
            <span className="text-md font-light">price:</span>
            <p
              className={` ${
                promotion && "line-through font-normal"
              } font-bold text-xl`}
            >
              ${price}
            </p>
            {promotion && (
              <p className="text-xl text-red-500 font-bold">${promotion}</p>
            )}
          </div>
        </div>
        <FaShoppingCart className="h-6 w-6" color="rgb(234, 179, 8)" />
      </div>
    </div>
  );
};

export default Product;
