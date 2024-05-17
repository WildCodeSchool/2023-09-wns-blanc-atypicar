import { Conversation } from "../entities/conversations";
import { Message } from "../entities/message";
import { User } from "../entities/user";

export const sendMessage = async (
  content: string,
  conversationId: number,
  userId: number
): Promise<Message | Error> => {
  try {
    const conversation = await Conversation.findOne({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new Error("Conversation introuvable.");
    }

    if (!content) {
      throw new Error("Le contenu du message ne peut pas être vide.");
    }

    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Utilisateur introuvable.");
    }

    const message = new Message();
    message.conversation = conversation;
    message.content = content;
    message.sentBy = user;

    return message.save();
  } catch (error: unknown) {
    return error as Error;
  }
};
