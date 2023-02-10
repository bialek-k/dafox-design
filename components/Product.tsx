import React, { useState, useContext } from "react";
import { Store } from "../store/Store";
import { Image as DatoImage } from "react-datocms";

interface ProductProps {
  title: string;
  price: number;
  data: any;
  promotion: any;
  freeShipping: any;
}

const Product = ({
  title,
  price,
  data,
  promotion,
  freeShipping,
}: ProductProps): React.ReactElement => {
  const [changeImage, setChangeImage] = useState(false);

  // const mouseEnterHandler = () => {
  //   if (data.gallery[1] === undefined) return;
  //   setChangeImage(true);
  // };
  // const mouseLeaveHandler = () => {
  //   setChangeImage(false);
  // };

  return (
    <div className="single-product p-4 flex flex-col justify-between ease-in-out duration-200 shadow-md h-96 rounded-md">
      <div className="content">
        <div
          className="photo mb-3 w-full aspect-square"
          // onMouseOver={mouseEnterHandler}
          // onMouseOut={mouseLeaveHandler}
        >
          <DatoImage
            className="rounded-md h-full"
            objectFit="cover"
            layout="responsive"
            data={data.image.responsiveImage}
          />
        </div>
        <div className="title mb-24 md:mb-0">
          <p className="text-sm font-bold">{title}</p>
        </div>
      </div>
      <div className="price flex  justify-between items-end">
        <div className="flex flex-col gap-2">
          {freeShipping && (
            <p className="font-bold text-xl text-yellow-400">FREE SHIPPING</p>
          )}
          <p className="text-black/50 text-sm dark:invert">
            stock: <span>{data.inStock}</span>
          </p>
          <div className="flex gap-2 items-center ">
            <p
              className={` ${
                promotion && "line-through font-normal"
              } font-bold text-md text-gray-500`}
            >
              ${price}
            </p>
            {promotion && (
              <p className="text-xl text-red-500 font-bold">${promotion}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

/*
 {/* {data?.image && (
            <DatoImage
              className="rounded-lg h-full"
              objectFit="cover"
              layout="responsive"
              data={
                changeImage
                  ? data.gallery[
                      Math.floor(Math.random() * data.gallery.length)
                    ].responsiveImage
                  : data.image.responsiveImage
              }
            />
          )} */
