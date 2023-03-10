import { Image as DatoImage } from "react-datocms";

import { Tooltip } from "@mui/material";

import { FaStar, FaQuestionCircle } from "react-icons/fa";
import { BiTime } from "react-icons/bi";

interface ProductProps {
  title: string;
  price: number;
  data: any;
  promotion: any;
  freeShipping: any;
  bestseller: boolean;
  limitedOffer?: boolean;
}

export const Product = ({
  title,
  price,
  data,
  promotion,
  freeShipping,
  bestseller,
  limitedOffer,
}: ProductProps): React.ReactElement => {
  return (
    <div className="wrapper bg-white dark:bg-neutral-900 rounded-md shadow-md h-80 sm:h-110 md:h-88 lg:h-100 ease-in-out duration-200 ">
      <div className="cart h-full flex flex-col relative ">
        <div className="aspect-square h-full">
          <DatoImage
            className="rounded-md h-full aspect-square relative"
            objectFit="cover"
            layout="responsive"
            data={data.image.responsiveImage}
          />
          <div className="absolute top-0 left-0 flex">
            {bestseller && <FaStar className="text-secondary p-2 w-12 h-12" />}
            {limitedOffer && (
              <BiTime className="text-secondary p-2 w-12 h-12" />
            )}
          </div>
        </div>
        <div className="content flex flex-col justify-between px-2 py-2 h-full ">
          <div className="title">
            <p className="text-xs md:text-sm ">{title}</p>
          </div>
          {freeShipping && (
            <Tooltip arrow title="Excluded: Izarel - $50">
              <p className="font-bold text-sm md:text-xl text-yellow-400">
                FREE SHIPPING
              </p>
            </Tooltip>
          )}
          <div className="price flex flex-col md:flex-row md:items-center justify-between">
            <div className="stock">
              <p className="text-black/50 text-xs text-right md:text-left dark:invert">
                stock: <span>{data.inStock}</span>
              </p>
            </div>
            <div className="priceNumber flex items-end justify-end gap-1">
              <p
                className={` ${
                  promotion &&
                  " text-sm text-neutral-500 line-through font-normal"
                } font-bold text-md `}
              >
                ${price}
              </p>
              {promotion && (
                <p className="text-xl text-yellow-500 font-bold">
                  ${promotion}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
