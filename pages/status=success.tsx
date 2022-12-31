import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import happyIcon from "../assets/happy.svg";
import Button from "../components/UI/Button";

const Success = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto justify-center">
      <div className="flex flex-col items-center mt-10">
        <div className="img mb-10 w-24 h-24">
          <Image src={happyIcon} layout="responsive" alt="happyIcon" />
        </div>
        <h1 className="font-bold text-xl">Well Done!</h1>
        <p>Thank you for your purchase we go to work</p>
        <div className="w-48">
          <Button
            addedClassName="mt-4 w-full"
            onClick={() => router.push("/shop")}
          >
            Go to shop
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
