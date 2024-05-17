import { AuthContext } from "@/contexts/authContext";
import { GET_USER_CONVERSATIONS, SEND_MESSAGE } from "@/graphql/client";
import { Conversation } from "@/types/conversation";
import { useMutation, useQuery } from "@apollo/client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Listbox,
  ListboxItem,
  ScrollShadow,
  Textarea,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";

const MessageBox = () => {
  const { currentUser } = useContext(AuthContext);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [filteredConversations, setFilteredConversations] = useState<
    Conversation[]
  >([]);
  const [openedConversation, setOpenedConversation] =
    useState<Conversation | null>();
  const [message, setMessage] = useState<string>("");

  const { loading, error, data, refetch } = useQuery(GET_USER_CONVERSATIONS, {
    variables: {
      getUserConversationsId: currentUser?.id,
    },
    onCompleted(data) {
      console.log(data.getUserConversations);
      setConversations(data.getUserConversations);
    },
  });

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted() {
      refetch().then(({ data }) => {
        const updatedConversations = data.getUserConversations;
        setConversations(updatedConversations);
        const updatedOpenedConversation: Conversation =
          updatedConversations.find(
            (conversation: Conversation) =>
              conversation.id === openedConversation?.id
          );
        setOpenedConversation(updatedOpenedConversation);
        console.log(openedConversation);
      });
    },
  });

  useEffect(() => {
    if (conversations && currentUser) {
      const filteredConversations: Conversation[] = conversations.map(
        (conversation: any) => {
          return {
            ...conversation,
            participants: conversation.participants.filter(
              (participant: any) => participant.id !== currentUser.id
            ),
          };
        }
      );
      setFilteredConversations(filteredConversations);
    }
  }, [conversations, sendMessage]);

  const handleOpenConversation = (id: number) => {
    filteredConversations.forEach((conversation) => {
      if (conversation.id === id) {
        setOpenedConversation(conversation);
      }
    });
  };

  const handleSendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (openedConversation) {
      const conversationId = openedConversation.id;
      try {
        await sendMessage({
          variables: {
            conversationId,
            sendMessageInput: message,
            userId: currentUser?.id,
          },
        });
      } catch (error) {
        console.error(error);
      }
      setMessage("");
    }
  };

  return (
    <div className="pt-3 pb-8 ">
      <h1 className="flex justify-center pt-3 pb-8 text-xl font-bold font-montserrat">
        Boîte de réception
      </h1>
      <div className="pt-10 flex items-center ">
        <div className="w-full flex  flex-col md:flex-row justify-between">
          <ScrollShadow className="basis-1/3">
            <Listbox
              label="Envoyé par"
              color="primary"
              className=""
              classNames={{
                base: "flex flex-row md:flex-col",
                list: "flex flex-row md:flex-col md:gap-4",
              }}
              items={filteredConversations}
            >
              {(item) => (
                <ListboxItem
                  key={item.id}
                  textValue={item.participants[0].firstName}
                  onClick={() => handleOpenConversation(item.id)}
                >
                  <div className="flex flex-col md:flex-row gap-2 items-center md:p-2">
                    <Avatar className="flex-shrink-0" size="sm" />
                    <div className="flex flex-col">
                      <span>{item.participants[0].firstName}</span>
                    </div>
                  </div>
                </ListboxItem>
              )}
            </Listbox>
          </ScrollShadow>

          <div className="px-12 basis-2/3 flex flex-col gap-6">
            <ScrollShadow className="h-[600px] py-2">
              {openedConversation &&
                openedConversation.messages.map((message) => {
                  if (message?.sentBy.id !== currentUser?.id) {
                    return (
                      <div className="flex flex-row gap-4 items-center mb-6">
                        <Avatar className="flex-shrink-0" size="sm" />
                        <Card className="bg-amber-100 p-2" shadow="none">
                          <CardBody>{message.content}</CardBody>
                        </Card>
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex flex-row gap-4 justify-end items-center mb-6">
                        <Card className="bg-zinc-100 p-2" shadow="none">
                          <CardBody>{message.content}</CardBody>
                        </Card>
                      </div>
                    );
                  }
                })}
            </ScrollShadow>

            <div className="flex items-center gap-4">
              <Textarea
                placeholder="Votre message..."
                minRows={1}
                maxRows={3}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              ></Textarea>
              <Button
                isIconOnly
                className="text-xl"
                color="primary"
                onClick={handleSendMessage}
              >
                <BsSend />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
