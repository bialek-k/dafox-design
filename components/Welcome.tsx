import arrow from "../assets/arrowDown.svg";
import { Image as DatoImage } from "react-datocms";

const Welcome = (): React.ReactElement => {
  return (
    <div className="bg-black h-min lg:h-2/4 py-24 mb-12 w-full px-6 lg:px-48 flex justify-center lg:items-center drop-shadow-clg relative">
      {/* <DatoImage
        data={heroImagesArr[8].responsiveImage}
        objectFit="cover"
        layout="fill"
        className="rounded-lg opacity-50"
        objectPosition="bottom"
      /> */}
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
          <div className="my-6  animate-pulse flex gap-4 mt-12 ">
            <p className="text-yellow-500 text-2xl font-bold">See more</p>
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
