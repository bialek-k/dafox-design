import React from "react";
import { useFormContext } from "react-hook-form";

interface InputCheckboxProps {
  name: string;
  label: string;
}

export const InputCheckbox = ({
  name,
  label,
}: InputCheckboxProps): React.ReactElement => {
  const { register } = useFormContext();

  return (
    <label className="p-2">
      <input
        {...register(name, { shouldUnregister: true })}
        type="checkbox"
        id={name}
        name={name}
        className="border-2 border-yellow-400 mr-2 "
      />
      <span className="text-sm text-gray-500 dark:text-white/80 ">{label}</span>
    </label>
  );
};
