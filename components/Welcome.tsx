import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Button from "./UI/Button";

import { Image as DatoImage } from "react-datocms";

const Welcome = ({ heroImagesArr }): React.ReactElement => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 8000;

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prevState) => {
        return prevState === heroImagesArr.length - 1 ? 0 : prevState + 1;
      });
    }, delay);

    return () => {
      resetTimeout();
    };
  }, [index, heroImagesArr.length]);

  return (
    <div className="bg-black py-24 px-6 lg:px-48 flex justify-center drop-shadow-clg">
      <div className="flex flex-col md:flex-row w-full justify-center md:h-min gap-10 ">
        <div className="images relative  w-full h-64 lg:h-128 lg:w-1/2  ">
          <div className="hidden md:inline absolute bg-yellow-500 top-2 left-2 rounded-lg w-full h-full"></div>
          <DatoImage
            data={heroImagesArr[index].responsiveImage}
            objectFit="cover"
            layout="fill"
            className="rounded-lg"
            objectPosition="center"
          />
        </div>
        <div className="content relative text-center md:text-left lg:text-left w-full lg:w-1/3 flex flex-col justify-between items-center lg:items-start ">
          <h1 className="text-yellow-500 mb-4 text-5xl font-bold break-words ">
            <span className="md:text-6xl xl:text-9xl">BESPOKE</span>
            <br /> CUSTOM STEERING WHEEL
          </h1>
          <p className="text-white text-md md:text-2xl max-w-xl mb-4 ">
            Welcome to the world of the best custom steering wheels made by
            <span className="text-yellow-500"> dafox_design team.</span>
          </p>
          <div className="action flex items-center md:items-start flex-col max-w-xl">
            <p className="text-yellow-500 tracking-widest text-md lg:text-md italic font-light mb-4">
              Get yourself a bespoke steering wheel you’ve been always dreaming
              about and enjoy driving your car for many years ahead!
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
