import { useState } from "react";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export const NewsletterContent = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    fetch("/api/subscribeUser", {
      body: JSON.stringify({
        email: data.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="content bg-black flex flex-col px-6 text-center md:text-left md:flex-row justify-between items-center rounded-lg shadow-lg py-6 md:w-2/3 md:px-10">
        <h1 className="text-yellow-500 md:text-2xl py-7 w-full text-center font-bold">
          Thank you for being a valued customer. Hundreds of clients have
          trusted us, and we appreciate your continued support.{" "}
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="content bg-black flex flex-col px-6 text-center md:text-left md:flex-row justify-between items-center rounded-lg shadow-lg py-6 md:w-2/3 md:px-10">
        <div className="description md:w-1/2 flex flex-col items-center md:items-start ">
          <h2 className="md:text-2xl text-xl text-white mb-2 md:mb-0">
            subscribe to our newsletter
          </h2>
          <p className="text-neutral-500 text-xs md:text-sm w-3/4 md:w-3/2">
            Get access to the world of exclusive steering wheels and stay
            updated on the latest news and best offers.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row items-center md:items-stretch gap-3 justify-center mt-6 md:mt-0 h-10 md:h-12"
        >
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <div className=" flex items-center">
                <p className="text-red-500 font-bold">{message}</p>
              </div>
            )}
          />
          <div className="flex justify-center">
            <input
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "email must contains @",
                },
              })}
              placeholder="your eamil"
              className="rounded-l-lg text-center h-10 md:h-auto w-1/2 md:w-full"
            />

            <button
              type="submit"
              className="bg-yellow-500 px-4 text-white font-bold rounded-r-lg"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
