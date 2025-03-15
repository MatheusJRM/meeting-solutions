import { isPhoneComplete } from "./phone-format-functions";

export const isDisable = (
  name: string,
  city: string,
  phone: string,
  products: string
) => {
  if (!name || !city || !phone || !products || !isPhoneComplete(phone)) {
    return true;
  }
  return false;
};
