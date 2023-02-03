import Welcome from "../components/Welcome";
import { Newsletter } from "../components/Newsletter";

const Hero = ({ heroImagesArr }) => {
  return (
    <div className="flex flex-col w-full items-center relative">
      <Welcome heroImagesArr={heroImagesArr} />
      <Newsletter />
    </div>
  );
};

export default Hero;
