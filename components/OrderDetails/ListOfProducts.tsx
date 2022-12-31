import React, { useContext } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { Store } from "../../store/Store";
import defaultPhoto from "../../assets/item.png";
import deleteIcon_black from "../../assets/delete_black.svg";
import deleteIcon_white from "../../assets/delete_white.svg";

import { Image as DatoImage } from "react-datocms";

const ListOfProducts = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const { systemTheme } = useTheme();

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item.slug });
    localStorage.removeItem("shoppingCart");
  };

  return (
    <table className="mx-auto mb-12 w-full  ">
      <thead className="border-b">
        <tr className="">
          <th className="hidden md:flex md:justify-center px-5 font-normal py-2">
            Image
          </th>
          <th className="px-5 font-normal py-2">Product</th>
          <th className="px-5 font-normal py-2">Price</th>
          <th className="px-5 font-normal py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <tr key={item.slug} className="border-b">
            <td className="hidden md:inline-block w-full ">
              <div className="flex w-24 h-24 md:mx-auto">
                <DatoImage
                  data={item.image.responsiveImage}
                  className="rounded-lg"
                />
              </div>
            </td>
            <td className="py-2 font-bold text-sm  text-center w-1/3">
              <Link href={`/shop/steeringwheels/${item.slug}`}>
                {item.name}
              </Link>
            </td>

            <td className="px-5 font-bold py-2 text-center ">$ {item.price}</td>
            <td className="flex justify-center h-full py-2">
              <button onClick={() => removeItemHandler(item)} className="h-24">
                <Image
                  src={
                    systemTheme === "dark" ? deleteIcon_white : deleteIcon_black
                  }
                  height={16}
                  width={16}
                  alt="delete icon"
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListOfProducts;
