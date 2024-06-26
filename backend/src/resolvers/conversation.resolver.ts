import * as ConversationService from "../services/conversation.service";
import { Arg, Ctx, Float, Mutation, Query, Resolver } from "type-graphql";
import { Conversation } from "../entities/conversations";
import { Context } from "apollo-server-core";

@Resolver(Conversation)
export class ConversationResolver {
  @Query(() => [Conversation])
  getUserConversations(@Ctx() ctx: Context): Promise<Conversation[] | Error> {
    return ConversationService.getUserConversations(ctx);
  }

  @Mutation(() => Conversation)
  createConversation(
    @Arg("participants", () => [Float]) participants: number[]
  ): Promise<Conversation | Error> {
    return ConversationService.createConversation(participants);
  }
}
