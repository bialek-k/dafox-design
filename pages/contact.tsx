import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import Image from "next/image";
import Button from "../components/UI/Button";
import logoWhite from "../assets/dafox_logo_black.png";
import { InputText } from "../components/Form/InputText";

const contactForm = z.object({
  name: z.string().min(1, "Imie jest wymagane"),
  email: z
    .string()
    .min(1, "Email jest wymagany")
    .email({ message: "Email nie jest poprawny" }),
  message: z.string(),
});

const defaultValues = {
  name: "",
  email: "",
  message: "",
};

type ContactFormType = z.TypeOf<typeof contactForm>;

const Contact = (): React.ReactElement => {
  const [isSend, setIsSend] = useState(false);
  const methods = useForm<ContactFormType>({
    defaultValues,
    resolver: zodResolver(contactForm),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (values: ContactFormType) => {
    const data = values;
    fetch("/api/mail/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    reset();
    setIsSend(true);
  };

  return (
    <>
      {!isSend ? (
        <main className="container mt-24 mx-auto flex flex-col items-center">
          <h1 className="font-bold text-center text-6xl">Leave a message</h1>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full px-6 mt-6 flex flex-wrap max-w-2xl"
            >
              <div className="flex flex-col md:flex-row justif-between w-full">
                <InputText name="name" label="Name" />
                <InputText name="email" label="Email" />
              </div>
              <InputText name="Message" textarea />
              <Button
                addedClassName="text-white px-10 mx-auto max-w-md"
                type="submit"
              >
                Wyślij
              </Button>
            </form>
          </FormProvider>
          <section>
            <div className="my-12 flex flex-col md:flex-row max-w-md gap-10 justify-between">
              <div className="flex-1">
                <Image
                  src={logoWhite}
                  width={150}
                  height={60}
                  alt="dafoxdesign logo"
                />
              </div>

              <div className="flex-1">
                <a href="mailto:info@dafoxdesign.com" className="text-lg">
                  info@dafoxdesign.com
                </a>
                <p>Al. Piłsudskiego 23a</p>
                <p>Rzeszów 35-074</p>
                <p>Poland</p>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <div className="container mt-24 mx-auto flex flex-col items-center">
          <h1 className="font-bold text-center text-5xl mb-6">
            Thanks for your message
          </h1>
          <p className="text-xl tracking-widest">
            we will reply as soon as possible
          </p>
        </div>
      )}
    </>
  );
};

export default Contact;
