import { In } from "typeorm";
import { Conversation } from "../entities/conversations";
import { User } from "../entities/user";

export const getUserConversations = async (
  ctx: any
): Promise<Conversation[] | Error> => {
  const userId = ctx.user.id;
  const user = await User.findOneOrFail({
    where: { id: userId },
    relations: ["conversations"],
  });

  if (!user) {
    throw new Error(`Utilisateur introuvable`);
  }

  return user.conversations;
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
