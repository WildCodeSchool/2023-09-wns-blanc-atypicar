import * as MessageService from "../services/message.service";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Message } from "../entities/message";

@Resolver(Message)
export class MessageResolver {
  @Mutation(() => Message)
  sendMessage(
    @Arg("sendMessageInput") sendMessageInput: string,
    @Arg("conversationId") conversationId: number,
    @Arg("userId") userId: number
  ): Promise<Message | Error> {
    return MessageService.sendMessage(sendMessageInput, conversationId, userId);
  }
}
