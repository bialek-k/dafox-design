import React from "react";

const CloseHamButton = ({ setOpenMobileMenu }) => {
  return (
    <button onClick={() => setOpenMobileMenu((prevState) => !prevState)}>
      <svg
        className="h-10 w-10 text-gray-600 "
        viewBox="0 0 22 22"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
};

export default CloseHamButton;
