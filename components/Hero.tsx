import Welcome from "./Welcome";

const Hero = ({ heroImagesArray }) => {
  return (
    <div className="flex flex-col w-full items-center relative">
      <Welcome heroImagesArray={heroImagesArray} />
    </div>
  );
};

export default Hero;
