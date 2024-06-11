import { Journey } from "./journey";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  birthday: Date;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
  creationDate: Date;
  verifiedLicense: boolean;
  verifiedEmail: boolean;
  picture?: string;
  description?: string;
  tag: number[];
  vehicle?: number;
  journey: Journey[];
};

export type UserInput = {
  firstName?: string;
  lastName?: string;
  birthday?: string;
  email?: string;
  password?: string;
};
