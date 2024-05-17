import { User } from "./user";

export type Message = {
  content: string;
  id: number;
  timestamp: Date;
  sentBy: User;
};
