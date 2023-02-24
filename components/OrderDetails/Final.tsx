import React, { useContext, useState } from "react";
import Link from "next/link";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import Button from "../UI/Button";

import { Store } from "../../store/Store";
import { deliveryPriceArr } from "../../utilities/deliveryPrice";

const Final = () => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const { watch } = useFormContext();
  const formData = watch();
  const totalAmount = cartItems.reduce((total, item) => item.price + total, 0);

  const getDeliveryCost = (country) => {
    const data = deliveryPriceArr.filter((item) => item.country === country);
    if (cartItems[0].freeShipping) {
      return "FREE SHIPPING";
    }
    return data[0].price;
  };

  const deliveryCost = getDeliveryCost(formData.country);

  const totalAmountPrice = () => {
    if (deliveryCost === "FREE SHIPPING") {
      return totalAmount;
    } else {
      return totalAmount + deliveryCost;
    }
  };

  return (
    <div className="finall w-full border rounded-md shadow-md p-6">
      <h1 className="font-bold text-xl mb-2">3. Summary</h1>
      <div className="content">
        {cartItems.map((item) => {
          return (
            <div className="product flex gap-4 mt-12" key={item.id}>
              <div className="flex items-center h-min">
                <Image
                  src={item.image.responsiveImage}
                  className="rounded-lg"
                  width={86}
                  height={86}
                  alt="product photo"
                />
              </div>
              <div className="description w-full px-2">
                <div className="title mb-2">
                  <h2 className="font-bold text-xl">{item.name}</h2>
                </div>
              </div>
            </div>
          );
        })}
        <div className="total bg-gray-100 dark:bg-black rounded-md p-4 my-6">
          <div className="price flex justify-between my-3">
            <p>Price:</p>
            <p className="text-md">${totalAmount}</p>
          </div>
          <div className="price flex justify-between my-3 text-green-400">
            <p>Delivery:</p>
            <p className="font-bold  text-md">${deliveryCost}</p>
          </div>
          <div className="price flex justify-between my-3">
            <p className="font-bold">Total:</p>
            <p className="font-bold  text-xl">${totalAmountPrice()}</p>
          </div>
        </div>
      </div>
      <div className="deliveryInfo">
        <h2 className="font-bold mb-2">Delivery Information:</h2>
        <p className="text-gray-500 text-sm dark:text-white/80"></p>
      </div>
      <div className="accept py-4">
        <label className="flex">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            className="border-2 border-yellow-400 mr-2 "
            onClick={() => setAcceptTerms((prevState) => !prevState)}
          />
          <p>
            Accept{" "}
            <Link href="/terms-and-conditions">
              <a>
                <span className="font-bold  text-yellow-500">
                  Terms & Conditions
                </span>
              </a>
            </Link>
          </p>
        </label>
      </div>
      <Button
        type="submit"
        disabled={acceptTerms ? false : true}
        addedClassName="mt-6"
      >
        Place Order
      </Button>
    </div>
  );
};

export default Final;
