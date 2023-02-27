import arrow from "../assets/arrowDown.svg";
import { Image as DatoImage } from "react-datocms";
import Image from "next/image";

import hero_image from "../assets/hero_image.jpg";
import { scrollToElement } from "../utilities/scrollToElement";

const Welcome = (): React.ReactElement => {
  return (
    <div className="bg-black h-min lg:h-2/4 py-24 mb-12 w-full px-6 lg:px-48 flex justify-center lg:items-center drop-shadow-clg relative">
      <Image
        src={hero_image}
        objectFit="cover"
        alt="bmw steering wheel"
        layout="fill"
        className="rounded-lg opacity-50"
        objectPosition="bottom"
      />

      <div className="content drop-shadow-lg font-light relative text-center w-full flex flex-col justify-between items-center">
        <h1 className="text-white text-2xl lg:text-5xl mb-8 ">
          Welcome to the world of<br></br>
          <strong className="text-yellow-500 font-bold">
            {" "}
            The Finest Steering Wheels{" "}
          </strong>{" "}
          <br /> crafted by
          <strong className="text-yellow-500 font-bold"> dafox_design</strong>
        </h1>
        <div className="action flex items-center  flex-col max-w-xl">
          <p className="text-yellow-500 tracking-widest text-md lg:text-md italic font-light mb-4">
            Make your
            <strong className="font-bold"> dream steering wheel</strong> a
            reality.<br></br>{" "}
            <strong className="font-bold">Don&apos;t miss</strong> the
            opportunity <strong className=" font-bold">to upgrade </strong>your
            driving game!
          </p>
          <div className="my-6  animate-pulse flex gap-4 mt-12 ">
            <button onClick={(e) => scrollToElement(e)} name="productList">
              <p className="text-yellow-500 text-2xl font-bold pointer-events-none">
                See more
              </p>
            </button>
            <div className="w-6">
              <DatoImage data={arrow} objectFit="contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
