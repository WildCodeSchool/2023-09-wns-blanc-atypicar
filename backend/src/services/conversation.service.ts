import { In } from "typeorm";
import { Conversation } from "../entities/conversations";
import { User } from "../entities/user";

export const getUserConversations = async (
  id: number
): Promise<Conversation[] | Error> => {
  const conversationIds = await Conversation.find({
    where: { participants: { id } },
    relations: ["participants"],
  });

  const ids = conversationIds.map((conversation) => conversation.id);

  const conversations = await Conversation.find({
    where: { id: In(ids) },
    relations: ["participants", "messages"],
  });

  return conversations;
};

export const createConversation = async (
  participantIds: number[]
): Promise<Conversation | Error> => {
  try {
    const users = await User.find({ where: { id: In(participantIds) } });

    if (users.length !== 2) {
      throw new Error("Deux utilisateurs sont requis.");
    }

    const conversation = new Conversation();
    conversation.participants = users;

    return conversation.save();
  } catch (error: unknown) {
    return new Error(
      "Une erreur est survenue lors de la création de la conversation."
    );
  }
};
