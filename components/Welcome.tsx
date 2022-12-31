import React from "react";
import Link from "next/link";
import Button from "./UI/Button";

const Welcome = (): React.ReactElement => {
  return (
    <div className="bg-black h-screen py-24 px-6 lg:px-48 flex justify-center drop-shadow-clg">
      <div className="flex flex-col items-center md:justify-center gap-2">
        <div className=" text-white text-center flex flex-col justify-center items-center gap-12">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-bold text-yellow-500">Welcome</h1>
            <p className="text-2xl leading-relaxed">
              First time here? <br /> Best deals until the{" "}
              <span className="font-bold text-yellow-500"> end of year.</span>{" "}
              Prices will go up in 2023! <br /> Don’t miss it! Thanks for your
              purchase!
            </p>
            <p className="text-white/60 mt-5">dafox_design team</p>
          </div>

          <div className="max-w-xl">
            <p className="text-yellow-500 tracking-widest text-xl lg:text-xl italic font-light">
              Get yourself a bespoke steering wheel you’ve been always dreaming
              about and enjoy driving your car for many years ahead!
            </p>
          </div>
        </div>
        <div className="my-6 w-1/4 animate-pulse">
          <Link href="/shop">
            <Button>Shop</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
