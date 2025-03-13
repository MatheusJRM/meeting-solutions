export const isPhoneComplete = (phone: string): boolean => {
  const numbers = phone.replace(/\D/g, "");
  return numbers.length === 11;
};

export const formatPhone = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "");
  return cleanedValue.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};
