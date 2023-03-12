import { Divider } from "@mui/material";
import React from "react";

export const Quote = () => {
  return (
    <div className="py-6">
      <Divider className="dark:invert" />
      <div className="description flex justify-center my-6 px-6">
        <p className="text-justify md:text-center text-sm md:text-base md:w-2/3 text-primary-dark dark:text-primary-darkMode tracking-wider">
          Not only do custom steering wheels add a touch of style to your
          vehicle&apos;s interior, they can also improve your{" "}
          <strong className="text-yellow-500">grip</strong> and{" "}
          <strong className="text-yellow-500">control</strong> on the road. A
          properly fitted custom steering wheel can provide a better grip and
          more comfortable driving position, reducing fatigue and{" "}
          <strong className="text-yellow-500">enhancing </strong>
          your driving experience.
        </p>
      </div>
      <Divider className="dark:invert" />
    </div>
  );
};
