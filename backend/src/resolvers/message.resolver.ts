import * as MessageService from "../services/message.service";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Message } from "../entities/message";

@Resolver(Message)
export class MessageResolver {
  @Query(() => [Message])
  getMessages(
    @Arg("conversationId") conversationId: number
  ): Promise<Message[]> {
    return MessageService.getMessages(conversationId);
  }

  @Mutation(() => Message)
  sendMessage(
    @Arg("sendMessageInput") sendMessageInput: string,
    @Arg("conversationId") conversationId: number
  ): Promise<Message | Error> {
    return MessageService.sendMessage(sendMessageInput, conversationId);
  }
}
