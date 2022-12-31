import React from "react";
import { ButtonHTMLAttributes, DOMAttributes } from "react";

interface ButtonProps {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  onClick?: any | DOMAttributes<HTMLButtonElement>["onClick"];
  children?: React.ReactNode;
  addedClassName?: string;
}

const Button = ({
  type = "button",
  disabled,
  onClick,
  children,
  addedClassName,
}: ButtonProps): React.ReactElement => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-yellow-500 px-1 py-2 text-white w-full rounded-md font-bold ${
        disabled && "bg-slate-500 text-white"
      } ${addedClassName}`}
    >
      {children}
    </button>
  );
};

export default Button;
