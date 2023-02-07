import { z } from "zod";

export const basicForm = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "address is required"),
  zipcode: z.string().min(1, "Zip-code is required"),
  country: z.string().min(1, "Country is required").optional(),
  city: z.string().min(1, "City is required"),
  email: z
    .string()
    .min(1, "This is required")
    .email({ message: "Must be a valid email" }),
  message: z.string(),
  checkbox: z.literal(false),
});

export const extendsForm = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  shipping_phone_number: z.number().min(1, "Phone number is required"),
  address: z.string().min(1, "address is required"),
  zipcode: z.string().min(1, "Zip-code is required"),
  country: z.string().min(1, "Country is required").optional(),
  city: z.string().min(1, "City is required"),
  email: z
    .string()
    .min(1, "This is required")
    .email({ message: "Must be a valid email" }),
  message: z.string(),
  tax_id: z.number(),
  shipping_name: z.string().min(1, "Name is required"),
  shipping_surname: z.string().min(1, "Surname is required"),
  shipping_address: z.string().min(1, "Address is required"),
  shipping_zipcode: z.string().min(1, "Zip-code is required"),
  shipping_country: z.string().min(1, "Country is required").optional(),
  shipping_city: z.string().min(1, "City is required"),
  checkbox: z.literal(true),
});

export const defaultValues = {
  name: "",
  surname: "",
  phone_number: "",
  address: "",
  city: "",
  country: "Select Country",
  zipcode: "",
  email: "",
  message: "",
  shipping_name: "",
  shipping_surname: "",
  shipping_phone_number: "",
  shipping_address: "",
  shipping_city: "",
  shipping_country: "Poland",
  shipping_zipcode: "",
  checkbox: false,
};
