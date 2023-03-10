import { InputText } from "../Form/InputText";
import { InputSelect } from "../Form/InputSelect";
import { InputCheckbox } from "../Form/InputCheckbox";

import { useFormContext } from "react-hook-form";

const BillingDetails = ({ deliveryCountriesData }): React.ReactElement => {
  const { watch } = useFormContext();
  const checkbox = watch("checkbox");

  const countries = deliveryCountriesData
    .sort((a, b) => a.country.localeCompare(b.country))
    .map((item) => item.country);

  return (
    <div className="deliveryAddres w-full border border-neutral-300 dark:border-neutral-500 shadow-md rounded-md px-4 py-4">
      <h1 className="font-bold text-xl mb-2 dark:text-secondary">
        1. Billing Details
      </h1>
      <div className="flex flex-col ">
        <div className="flex flex-col py-2  ">
          <div className="flex flex-col md:flex-row">
            <InputText name="name" label="Name" />
            <InputText name="surname" label="Surname" />
            <InputText name="phone_number" label="Phone numer" />
          </div>
          <InputText name="city" label="City" />
          <InputText name="address" label="Address" />
          <InputText name="zipcode" label="Zip-Code" />
          <InputText name="tax_id" label="Tax ID (optional)" />

          <div className="p-2 w-full">
            <InputSelect countries={countries} name="country" />
          </div>

          <InputText name="email" label="Email" />
          <InputText name="message" label="Message to the Seller" textarea />
          <InputCheckbox
            name="checkbox"
            label="Shipping to a different address?"
          />
          {checkbox ? (
            <div>
              <div className="flex flex-col md:flex-row">
                <InputText name="shipping_name" label="Name" />
                <InputText name="shipping_surname" label="Surname" />
                <InputText name="shipping_phone_number" label="Phone number" />
              </div>
              <InputText name="shipping_city" label="City" />
              <InputText name="shipping_address" label="Address" />
              <InputText name="shipping_zipcode" label="Zip-Code" />
              <div className="p-2 w-full">
                <InputSelect
                  countries={["Poland", "UK", "Brazil"]}
                  name="shipping_country"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
