import { Conversation } from "../entities/conversations";
import { Message } from "../entities/message";

export const getMessages = async (id: number): Promise<Message[]> => {
  const messages = await Message.find({
    where: { conversation: { id } },
    relations: ["conversation"],
  });

  if (!messages) {
    throw new Error(`Messages avec l'id ${id} introuvables.`);
  }

  return messages;
};

export const sendMessage = async (
  content: string,
  conversationId: number
): Promise<Message | Error> => {
  try {
    const conversation = await Conversation.findOne({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new Error("Conversation introuvable.");
    }

    const message = new Message();
    message.conversation = conversation;
    message.content = content;

    return message.save();
  } catch (error: unknown) {
    return new Error("Problème d'envoi lors du message");
  }
};
