import { HTMLInputTypeAttribute } from "react";
import FormErrorMessage from "./FormErrorMessage";
import { useFormContext, get } from "react-hook-form";

interface InputTextProps {
  name: string;
  label?: string;
  inputType?: HTMLInputTypeAttribute;
  textarea?: boolean;
  showLabel?: boolean;
  labelClassName?: string;
  inputClassName?: string;
  textAreaClassName?: string;
  containerClassName?: string;
}

export const InputText = ({
  name,
  inputType = "text",
  label,
  showLabel = false,
  textarea = false,
  labelClassName,
  inputClassName,
  textAreaClassName,
  containerClassName,
}: InputTextProps): React.ReactElement => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);

  if (!textarea)
    return (
      <div className={containerClassName ?? "p-2 w-full "}>
        {showLabel && (
          <label
            htmlFor={name}
            className={
              labelClassName || '"leading-7 text-sm text-grey-100 capitalize"'
            }>
            {name}
          </label>
        )}
        <input
          type={inputType}
          id={name}
          {...register(name)}
          placeholder={label}
          className={
            inputClassName || "border px-4 py-2 rounded-md text-xs w-full"
          }
        />
        {error && <FormErrorMessage message={error.message} />}
      </div>
    );

  return (
    <div className="p-2 w-full">
      <div className="relative">
        {showLabel && (
          <label
            htmlFor={name}
            className="leading-7 text-sm text-gray-100 capitalize">
            {label ?? name}
          </label>
        )}
        <textarea
          id={name}
          {...register(name)}
          placeholder={label ?? name}
          className={
            textAreaClassName ||
            "border px-4 py-2 rounded-lg text-xs mb-2 h-24 w-full"
          }
        />
        {error && <FormErrorMessage message={error.message} />}
      </div>
    </div>
  );
};
