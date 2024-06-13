import { Category } from "./category";
import { User } from "./user";

export type Vehicle = {
  id: number;
  model: string;
  brand: string;
  name?: string;
  seats: number;
  picture?: string;
  user?: User;
  category: Category;
};
