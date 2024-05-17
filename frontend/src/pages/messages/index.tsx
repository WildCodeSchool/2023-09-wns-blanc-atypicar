import { AuthContext } from "@/contexts/authContext";
import { GET_USER_CONVERSATIONS } from "@/graphql/client";
import { Conversation } from "@/types/conversation";
import { useQuery } from "@apollo/client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Listbox,
  ListboxItem,
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

  const { loading, error, data } = useQuery(GET_USER_CONVERSATIONS, {
    variables: {
      getUserConversationsId: currentUser?.id,
    },
    onCompleted(data) {
      setConversations(data.getUserConversations);
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
  }, [conversations]);

  return (
    <div className="pt-10 flex flex-col items-center ">
      <h1 className="flex justify-center pt-3 pb-8 text-xl font-bold font-montserrat">
        Boîte de réception
      </h1>

      <div className="w-full flex justify-between">
        <Listbox
          color="primary"
          className="basis-1/3"
          items={filteredConversations}
        >
          {(item) => (
            <ListboxItem
              key={item.id}
              textValue={item.participants[0].firstName}
            >
              <div className="flex gap-2 items-center">
                <Avatar className="flex-shrink-0" size="sm" />
                <div className="flex flex-col">
                  <span>{item.participants[0].firstName}</span>
                  <span className="text-small text-default-400">message</span>
                </div>
              </div>
            </ListboxItem>
          )}
        </Listbox>

        <div className="px-12 basis-2/3 flex flex-col gap-6">
          <div className="flex flex-row gap-4 items-center">
            <Avatar className="flex-shrink-0" size="sm" />
            <Card className="bg-amber-100 p-2" shadow="none">
              <CardBody>Je voudrais réserver un trajet.</CardBody>
            </Card>
          </div>
          <div className="flex flex-row gap-4 justify-end items-center">
            <Card className="bg-zinc-100 p-2" shadow="none">
              <CardBody>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
                cum consectetur architecto illum neque ullam dolore obcaecati!
                Nostrum quibusdam sequi reiciendis? Dolores dicta quisquam
                distinctio suscipit fugiat eligendi alias facilis.
              </CardBody>
            </Card>
          </div>
          <div className="flex items-center gap-4">
            <Textarea
              placeholder="Votre message..."
              minRows={1}
              maxRows={3}
            ></Textarea>
            <Button isIconOnly className="text-xl" color="primary">
              <BsSend />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
