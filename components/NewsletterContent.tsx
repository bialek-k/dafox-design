import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";

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
        name: data.name,
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
      <div className="container bg-black flex flex-col px-6 text-center md:text-left md:flex-row justify-between items-center rounded-lg shadow-lg py-6 md:w-2/3 md:px-10">
        <h1 className="text-yellow-500 md:text-2xl py-7 w-full text-center font-bold">
          Thank you for being a valued customer. Hundreds of clients have
          trusted us, and we appreciate your continued support.{" "}
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="container overflow-hidden relative flex flex-col text-center md:text-left md:flex-row md:justify-center justify-between items-center py-10 w-full">
        <div className="description md:w-1/2 flex flex-col md:justify-center items-center md:items-start mb-10 md:mb-0 ">
          <h2 className="md:text-3xl text-3xl text-white font-bold mb-2 md:mb-0 drop-shadow-lg ">
            Join our newsletter
          </h2>
          <p className="text-neutral-100 text-sm md:text-sm w-3/4 md:w-3/2 drop-shadow-md">
            Get access to the world of exclusive steering wheels and stay
            updated on the latest news and best offers.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-5 w-full md:h-full md:w-auto md:flex md:justify-end"
        >
          <div className="errors flex md:flex-col gap-2">
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <div className=" flex items-center">
                  <p className="text-red-500 font-bold">{message}</p>
                </div>
              )}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <div className=" flex items-center">
                  <p className="text-red-500 font-bold">{message}</p>
                </div>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row w-full justify-center items-center gap-1 z-20 ">
            <input
              {...register("name", {
                required: "name is required",
              })}
              placeholder="name"
              className="rounded-lg md:rounded-r-none text-center h-10 md:h-12 w-full shadow-lg"
            />
            <input
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "email must contains @",
                },
              })}
              placeholder="email"
              className=" rounded-lg md:rounded-none text-center h-10 md:h-12 w-full shadow-lg"
            />

            <button
              type="submit"
              className="bg-black px-4 text-white font-bold rounded-lg md:rounded-l-none md:rounded-r-lg shadow-lg text-center h-10 md:h-12 w-full md:w-1/2"
            >
              Send
            </button>
          </div>
          <div className="icon hidden md:flex absolute h-full w-full top-0 justify-center items-center left-0 z-10  ">
            <MdOutlineEmail className="w-64 h-64 rotate-12 text-white/10 " />
          </div>
        </form>
      </div>
    </>
  );
};
