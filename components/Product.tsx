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
  return (
    <div className="wrapper bg-white dark:bg-neutral-900 rounded-md shadow-md h-80 sm:h-110 md:h-88 lg:h-100 ease-in-out duration-200 ">
      <div className="cart h-full flex flex-col ">
        <div className="aspect-square h-full">
          <DatoImage
            className="rounded-md h-full aspect-square"
            objectFit="cover"
            layout="responsive"
            data={data.image.responsiveImage}
          />
        </div>
        <div className="content flex flex-col justify-between px-2 py-2 h-full ">
          <div className="title">
            <p className="text-xs md:text-sm ">{title}</p>
          </div>
          {freeShipping && (
            <p className="font-bold py-2 text-sm md:text-xl text-yellow-400">
              FREE SHIPPING
            </p>
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
                } font-bold text-xl `}
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

export default Product;
