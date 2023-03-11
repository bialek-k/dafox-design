import { useState, useEffect } from "react";
import { InputText } from "./InputText";
import Button from "../UI/Button";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";

import logoWhite from "../../assets/dafox_logo_black.png";

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

interface ContactFormProps {
  title: string;
  subtitle: string;
}

type ContactFormType = z.TypeOf<typeof contactForm>;

export const ContactForm = ({ title, subtitle }: ContactFormProps) => {
  const methods = useForm<ContactFormType>({
    defaultValues,
    resolver: zodResolver(contactForm),
  });
  const [isSend, setIsSend] = useState(false);
  const [name, setName] = useState("");

  const { handleSubmit, reset, watch } = methods;

  const onSubmit = (values: ContactFormType) => {
    const data = values;
    fetch("/api/mail/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    reset();
    setName(data.name);
    setIsSend(true);
  };

  if (isSend) {
    return (
      <div className="wrapper py-12 bg-yellow-500 mx-auto gap-2 flex flex-col items-center">
        <div className="container mx-auto">
          <h1 className=" text-center text-2xl md:text-4xl">
            Thanks <strong className="text-white">{name}</strong> for your
            message
          </h1>
          <p className="text-neutral-600 text-center text-sm md:text-base tracking-wide">
            we will reply as soon as possible
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="wrapper w-full py-12 bg-neutral-100 mx-auto flex flex-col items-center">
      <div className="container flex flex-col items-center gap-4">
        <div className="title flex flex-col gap-3 mb-6 px-6">
          <h1 className="font-bold text-center text-2xl dark:invert">
            {title}
          </h1>
          <p className="text-neutral-600 text-center text-sm">{subtitle}</p>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full px-6 mt-6 flex flex-wrap max-w-2xl"
          >
            <div className="flex flex-col md:flex-row justif-between w-full">
              <InputText name="name" label="Name" />
              <InputText name="email" label="Email" />
            </div>
            <InputText name="message" textarea />
            <Button
              addedClassName="text-white px-10 mx-auto max-w-md"
              type="submit"
            >
              Send
            </Button>
          </form>
        </FormProvider>
        <section>
          <div className="mt-12 flex flex-col md:flex-row max-w-md gap-10 justify-between">
            <div className="flex-1">
              <Image
                src={logoWhite}
                width={150}
                height={60}
                alt="dafoxdesign logo"
              />
            </div>

            <div className="flex-1 text-sm text-center text-primary-dark">
              <a href="mailto:info@dafoxdesign.com">info@dafoxdesign.com</a>
              <p>Al. Piłsudskiego 23a</p>
              <p>Rzeszów 35-074</p>
              <p>Poland</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
