import { useState } from "react";

export const NewsletterContent = () => {
  const [email, setEmail] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (email === null) return;

    await fetch("/api/subscribeUser", {
      body: JSON.stringify({
        email: email,
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
        <h1 className="text-yellow-500 md:text-3xl py-7 w-full text-center font-bold">
          Thanks for your email! :){" "}
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
          <p className="text-neutral-500 text-xs md:text-sm w-3/4">
            Lorem ipsum dolor sit amet consectetur
          </p>
        </div>
        <form
          onSubmit={submitHandler}
          className="flex justify-center mt-6 md:mt-0 h-10 md:h-12"
        >
          <input
            type="text"
            placeholder="your eamil"
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-l-lg text-center w-1/2 md:w-full"
          />
          <button
            type="submit"
            className="bg-yellow-500 px-4 text-white font-bold rounded-r-lg"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};
