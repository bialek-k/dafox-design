import { useState } from "react";
import { NewsletterContent } from "./NewsletterContent";

export const Newsletter = () => {
  return (
    <div className="wrapper w-full px-6 md:px-0 h-min flex justify-center absolute -bottom-6 md:bottom-0 md:left-0">
      <NewsletterContent />
    </div>
  );
};
