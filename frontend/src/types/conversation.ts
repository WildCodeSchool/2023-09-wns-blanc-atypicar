import { User } from "./user";

export type Conversation = {
  id: number;
  participants: User[];
};
