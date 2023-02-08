import Welcome from "./Welcome";
import { Newsletter } from "./Newsletter";

const Hero = () => {
  return (
    <div className="flex flex-col w-full items-center relative">
      <Welcome />
      <Newsletter />
    </div>
  );
};

export default Hero;
