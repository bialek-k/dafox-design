import React, { useContext, useState } from "react";
import { Store } from "../store/Store";

import { client } from "../lib/apollo";
import { gql } from "@apollo/client";

import { z } from "zod";
import { basicForm, extendsForm } from "../utilities/zod/zodObjects";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";

import BillingDetails from "../components/OrderDetails/BillingDetails";
import Final from "../components/OrderDetails/Final";

import createCheckoutSession from "../utilities/createCheckoutSession";

import Spinner from "../components/UI/Spinner";

const FormSchema = z.discriminatedUnion("checkbox", [basicForm, extendsForm]);

type CheckoutFormType = z.TypeOf<typeof FormSchema>;

const defaultValues = {
  name: "",
  surname: "",
  phone_number: "",
  address: "",
  city: "",
  country: "Select Country",
  zipcode: "",
  email: "",
  message: "",
  shipping_name: "",
  shipping_surname: "",
  shipping_phone_number: "",
  shipping_address: "",
  shipping_city: "",
  shipping_country: "Select Country",
  shipping_zipcode: "",
};

const Checkout = ({ deliveryCountriesData }): React.ReactElement => {
  const [deliveryPrice, setDeliveryPrice] = useState(null);
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const methods = useForm<CheckoutFormType>({
    defaultValues,
    resolver: zodResolver(FormSchema),
  });
  const totalAmount = cartItems.reduce((total, item) => item.price + total, 0);

  const finalCosts = () => {
    if (deliveryPrice) {
      return totalAmount + deliveryPrice;
    } else {
      return totalAmount;
    }
  };

  const checkoutProduct = (data) => {
    const productNames = cartItems.map((item) => item.name).toString();

    const item = {
      name: productNames,
      quantity: cartItems.length,
      price: finalCosts(),
      metadata: data,
    };

    createCheckoutSession(item);
  };

  const slug = cartItems.map((item) => item.slug);

  const onSubmit = (data) => {
    const newData = {
      ...data,
      productLink: `https://www.dafoxdesign.com/shop/${slug[0]}`,
    };
    checkoutProduct(newData);

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
          <BillingDetails deliveryCountriesData={deliveryCountriesData} />
          <Final
            deliveryCountriesData={deliveryCountriesData}
            setDeliveryPrice={setDeliveryPrice}
          />
        </form>
      </div>
    </FormProvider>
  );
};

export default Checkout;

export async function getStaticProps() {
  const deliveryCountriesQuery = gql`
    query MyQuery {
      allDeliveryCountries(first: "100") {
        id
        price
        country
      }
    }
  `;

  const { data } = await client.query({ query: deliveryCountriesQuery });

  return {
    props: {
      deliveryCountriesData: data.allDeliveryCountries,
    },
  };
}
