import React from "react";

import { useRouter } from "next/router";

import Image from "next/image";
import Button from "./UI/Button";

import sadIcon from "../assets/sad.svg";

const EmptyCart = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <div className="img mb-10 w-24 h-24">
        <Image src={sadIcon} layout="responsive" alt="sadIcon" />
      </div>

      <h1 className="font-bold text-xl">Your cart is empty!</h1>
      <p>add some stuff</p>
      <div className="w-48">
        <Button
          addedClassName="mt-4 w-full"
          onClick={() => router.push("/shop")}
        >
          Go to shop
        </Button>
      </div>
    </div>
  );
};

export default EmptyCart;
