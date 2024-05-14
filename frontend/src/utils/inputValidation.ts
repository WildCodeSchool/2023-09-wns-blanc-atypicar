export const validateCity = (value: string) =>
  /^[A-Za-z\s\u00C0-\u00FF'’]+$/u.test(value);

export const isInvalidCity = (value = "") =>
  value !== "" && !validateCity(value);

export const validateSeats = (valueInt: number) =>
  valueInt > 0 && valueInt < 21;

export const isInvalidSeats = (valueInt = 0) =>
  valueInt !== 0 && !validateSeats(valueInt);
