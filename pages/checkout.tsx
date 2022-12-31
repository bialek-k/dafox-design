import React, { useContext } from "react";
import { Store } from "../store/Store";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";

import { deliveryPriceArr } from "../utilities/deliveryPrice";

import BillingDetails from "../components/OrderDetails/BillingDetails";
import Final from "../components/OrderDetails/Final";

import createCheckoutSession from "../utilities/createCheckoutSession";
import { deliveryPrice } from "../utilities/deliveryPriceSetter";

import Spinner from "../components/UI/Spinner";

const basicForm = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  address: z.string().min(1, "address is reguired"),
  zipcode: z.string().min(1, "Zip-code is reguired"),
  country: z.string().min(1, "Country is required").optional(),
  city: z.string().min(1, "City is reguired"),
  email: z
    .string()
    .min(1, "This is required")
    .email({ message: "Must be a valid email" }),
  message: z.string(),
  checkbox: z.literal(false),
});

const extendsForm = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  address: z.string().min(1, "address is reguired"),
  zipcode: z.string().min(1, "Zip-code is reguired"),
  country: z.string().min(1, "Country is required").optional(),
  city: z.string().min(1, "City is reguired"),
  email: z
    .string()
    .min(1, "This is required")
    .email({ message: "Must be a valid email" }),
  message: z.string(),
  tax_id: z.number(),
  shipping_name: z.string().min(1, "Name is required"),
  shipping_surname: z.string().min(1, "Surname is required"),
  shipping_address: z.string().min(1, "Address is reguired"),
  shipping_zipcode: z.string().min(1, "Zip-code is reguired"),
  shipping_country: z.string().min(1, "Country is required").optional(),
  shipping_city: z.string().min(1, "City is reguired"),
  checkbox: z.literal(true),
});

const FormSchema = z.discriminatedUnion("checkbox", [basicForm, extendsForm]);

const defaultValues = {
  name: "",
  surname: "",
  address: "",
  city: "",
  country: "Australia",
  zipcode: "",
  email: "",
  message: "",
  shipping_name: "",
  shipping_surname: "",
  shipping_address: "",
  shipping_city: "",
  shipping_country: "Poland",
  shipping_zipcode: "",
  checkbox: false,
};

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
