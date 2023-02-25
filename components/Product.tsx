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

  // MdOutlineEmail

  return (
    <div className="wrapper rounded-md shadow-md h-80 sm:h-110 md:h-88 lg:h-100 ease-in-out duration-200 ">
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
            <p className="text-xs md:text-sm">{title}</p>
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
                } font-bold text-xl text-yellow-500`}
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
    </div>
    // <div className=" flex flex-col ease-in-out duration-200 shadow-md  rounded-md">
    //   <div className="content h-128 md:h-96 bg-yellow-200  ">
    //     <div
    //       className="aspect-square"
    //       // onMouseOver={mouseEnterHandler}
    //       // onMouseOut={mouseLeaveHandler}
    //     >
    //       <DatoImage
    //         className="rounded-md h-full"
    //         objectFit="cover"
    //         layout="responsive"
    //         data={data.image.responsiveImage}
    //       />
    //     </div>
    //     <div className="description px-4 flex flex-col bg-blue-400 h-full ">
    //       <div className="title">
    //         <p className="text-sm sm:text-sm font-bold">{title}</p>
    //       </div>
    //       <div className="price flex bg-red-400 ">
    //         <div className="flex flex-col ">
    //           {freeShipping && (
    //             <p className="font-bold text-xl text-yellow-400">
    //               FREE SHIPPING
    //             </p>
    //           )}
    //           <p className="text-black/50 text-sm dark:invert">
    //             stock: <span>{data.inStock}</span>
    //           </p>
    //           <div className="flex flex-row gap-2 items-center ">
    //             <p
    //               className={` ${
    //                 promotion && "line-through font-normal"
    //               } font-bold text-md text-gray-500`}
    //             >
    //               ${price}
    //             </p>
    //             {promotion && (
    //               <p className="text-xl text-red-500 font-bold">${promotion}</p>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
