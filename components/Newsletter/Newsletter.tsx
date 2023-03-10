import { useState } from "react";
import { NewsletterContent } from "./NewsletterContent";
import { MdOutlineEmail } from "react-icons/md";

export const Newsletter = () => {
  return (
    <div className="wrapper w-full h-min flex justify-center bg-yellow-600  ">
      <NewsletterContent />
    </div>
  );
};
