import React, { useContext } from "react";
import { Store } from "../store/Store";

import { z } from "zod";
import {
  basicForm,
  extendsForm,
  defaultValues,
} from "../utilities/zod/zodObjects";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";

import { deliveryPriceArr } from "../utilities/deliveryPrice";

import BillingDetails from "../components/OrderDetails/BillingDetails";
import Final from "../components/OrderDetails/Final";

import createCheckoutSession from "../utilities/createCheckoutSession";

import Spinner from "../components/UI/Spinner";

const FormSchema = z.discriminatedUnion("checkbox", [basicForm, extendsForm]);

type CheckoutFormType = z.TypeOf<typeof FormSchema>;

const Checkout = (): React.ReactElement => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const methods = useForm<CheckoutFormType>({
    defaultValues,
    resolver: zodResolver(FormSchema),
  });

  const checkoutProduct = (data) => {
    const deliveryTotalPrice = () => {
      const price = deliveryPriceArr.filter(
        (item) => item.country === data.country
      );
      return price[0].price;
    };
    const totalAmount = cartItems.reduce(
      (total, item) => item.price + total,
      0
    );
    const productNames = cartItems.map((item) => item.name).toString();

    const item = {
      name: productNames,
      quantity: cartItems.length,
      price: totalAmount + deliveryTotalPrice(),
      metadata: data,
    };

    createCheckoutSession(item);
  };

  const onSubmit = (data) => {
    checkoutProduct(data);

    dispatch({
      type: "CART_REMOVE_ITEM",
      payload: cartItems[0].slug,
    });
  };

  if (!cartItems[0]) {
    return <Spinner />;
  }

  return (
    <FormProvider {...methods}>
      <div className="container mb-48 mx-auto p-6 ">
        <div className="title py-6">
          <h1 className="font-nomral text-2xl tracking-wider text-neutral-400">
            Last step to order your stuff
          </h1>
        </div>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-6"
        >
          <BillingDetails />
          <Final />
        </form>
      </div>
    </FormProvider>
  );
};

export default Checkout;
