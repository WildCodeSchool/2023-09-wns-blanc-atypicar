import { Message } from "./messages";
import { User } from "./user";

export type Conversation = {
  id: number;
  participants: User[];
  messages: Message[];
};
