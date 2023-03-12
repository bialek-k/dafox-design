import React, { useContext, useState } from "react";

import Link from "next/link";

import Button from "../components/UI/Button";
import { Store } from "../store/Store";

import EmptyCart from "../components/EmptyCart";
import ListOfProducts from "../components/OrderDetails/ListOfProducts";

const Cart = (): React.ReactElement => {
  const [confirmed, setConfirmed] = useState(false);
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const totalAmount = cartItems.reduce((total, item) => item.price + total, 0);

  if (cartItems.length === 0) {
    return (
      <div className=" container mx-auto mb-96 justify-center pt-10">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="container mx-auto mb-96 justify-center pt-10">
      <div className=" flex flex-col lg:flex-row items-center px-6 ">
        <div className="pt-24  w-full">
          <h1 className=" text-2xl mb-8 font-bold text-secondary">
            Your order:
          </h1>
          {!confirmed && <ListOfProducts />}
          <div className="flex justify-center my-2  md:justify-end">
            <div className="flex flex-col w-full gap-2 justify-center md:w-64 md:items-end">
              {!confirmed && (
                <p className="text-md">
                  Total: <strong className="text-2xl">$ {totalAmount}</strong>
                </p>
              )}
              <Link href="/checkout">
                <Button>Proceed Checkout</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
