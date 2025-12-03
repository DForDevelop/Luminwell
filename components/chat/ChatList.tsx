"use client";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Conversation, PopulatedChatUser } from "@/types/chat";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ChatListProps {
  conversations: Conversation[];
}

const ChatList = ({ conversations }: ChatListProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const userId = session?.user?._id;

  const openChat = (conversationId: string) => {
    if (session?.user.role === "ambassador") {
      router.push(`/ambassador/${userId}/conversations/${conversationId}`);
    } else {
      router.push(`/user/${userId}/conversations/${conversationId}`);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 font-bold text-lg">Chats</div>
      <Separator />

      <ScrollArea className="flex-1">
        {conversations.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No conversations yet
          </div>
        )}

        {conversations.map((chat) => {
          const otherParticipants = chat.participants.find(
            (p: PopulatedChatUser) => p._id !== userId
          );

          return (
            <div
              key={chat._id}
              onClick={() => openChat(chat._id)}
              className={`flex px-3 py-2 border-b cursor-pointer hover:bg-gray-100 `}>
              <Avatar className="w-10 h-10 flex items-center justify-center my-auto">
                <AvatarImage
                  src={otherParticipants?.avatar}
                  alt={otherParticipants?.username}
                />
                <AvatarFallback>
                  {otherParticipants?.username?.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col ml-4 w-full">
                <span className="font-medium capitalize">
                  {otherParticipants?.username}
                </span>

                <span className="text-sm text-muted-foreground truncate">
                  {chat.lastMessage?.text ?? "No messages yet"}
                </span>
              </div>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
};

export default ChatList;
