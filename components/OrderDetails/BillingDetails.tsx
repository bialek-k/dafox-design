import { InputText } from "../Form/InputText";
import { InputSelect } from "../Form/InputSelect";
import { InputCheckbox } from "../Form/InputCheckbox";

import { deliveryCountries } from "../../utilities/deliveryCountries";

import { useFormContext } from "react-hook-form";

const BillingDetails = (): React.ReactElement => {
  const { watch } = useFormContext();
  const checkbox = watch("checkbox");

  const countries = deliveryCountries.map((item) => item.country);

  return (
    <div className="deliveryAddres w-full  border-[1px] shadow-md rounded-md p-6">
      <h1 className="font-bold text-xl mb-2">1. Billing Details</h1>
      <div className="flex flex-col ">
        <div className="p-4 flex-col">
          <div className="flex flex-col py-2  ">
            <div className="div flex">
              <InputText name="name" label="Name" />
              <InputText name="surname" label="Surname" />
              <InputText name="phone_number" label="Phone number" />
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
                <div className="div flex">
                  <InputText name="shipping_name" label="Name" />
                  <InputText name="shipping_surname" label="Surname" />
                  <InputText
                    name="shipping_phone_number"
                    label="Phone number"
                  />
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
    </div>
  );
};

export default BillingDetails;
