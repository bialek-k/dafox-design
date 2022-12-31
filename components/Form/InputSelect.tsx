import FormErrorMessage from "./FormErrorMessage";
import { useFormContext, get } from "react-hook-form";

interface InputSelectProps {
  name: string;
  countries?: Array<string>;
}

export const InputSelect = ({
  countries,
  name,
}: InputSelectProps): React.ReactElement => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);

  return (
    <select
      {...register(name)}
      id={name}
      name={name}
      className="border text-gray-400 px-3 py-2 rounded-md text-xs w-full">
      {countries.map((country) => {
        return (
          <option key={country} value={country}>
            {country}
          </option>
        );
      })}
      {error && <FormErrorMessage message={error.message} />}
    </select>
  );
};
