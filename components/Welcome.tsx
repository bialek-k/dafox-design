import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Button from "./UI/Button";

import { Image as DatoImage } from "react-datocms";

const Welcome = ({ heroImagesArr }): React.ReactElement => {
  // const [index, setIndex] = useState(0);
  // const timeoutRef = useRef(null);
  // const delay = 8000;

  // function resetTimeout() {
  //   if (timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //   }
  // }

  // useEffect(() => {
  //   resetTimeout();
  //   timeoutRef.current = setTimeout(() => {
  //     setIndex((prevState) => {
  //       return prevState === heroImagesArr.length - 1 ? 0 : prevState + 1;
  //     });
  //   }, delay);

  //   return () => {
  //     resetTimeout();
  //   };
  // }, [index, heroImagesArr.length]);

  return (
    <div className="bg-black h-min lg:h-screen relative py-24 px-6 lg:px-48 flex justify-center lg:items-center drop-shadow-clg">
      <div className="flex flex-col md:flex-row w-full md:h-min  ">
        <DatoImage
          data={heroImagesArr[8].responsiveImage}
          objectFit="cover"
          layout="fill"
          className="rounded-lg opacity-50"
          objectPosition="bottom"
        />
        <div className="content drop-shadow-lg font-light relative text-center w-full flex flex-col justify-between items-center">
          <h1 className="text-white text-2xl lg:text-5xl mb-8 ">
            Welcome to the world of{" "}
            <strong className="text-yellow-500 font-bold">
              {" "}
              The Best Custom Steering Wheels{" "}
            </strong>{" "}
            <br /> made by
            <strong className="text-yellow-500 font-bold"> dafox_design</strong>
          </h1>
          <div className="action flex items-center  flex-col max-w-xl">
            <p className="text-yellow-500 tracking-widest text-md lg:text-md italic font-light mb-4">
              <strong className=" font-bold">
                Get yourself a bespoke steering wheel
              </strong>{" "}
              you’ve been always dreaming about and{" "}
              <strong className=" font-bold">enjoy driving your car</strong> for
              many years ahead!
            </p>
            <div className="my-6 w-1/4 animate-pulse">
              <Link href="/shop">
                <Button>Shop</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
