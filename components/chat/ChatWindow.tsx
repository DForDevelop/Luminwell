"use client";
import React, { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";
import { Messages } from "@/types/chat";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { getAbly } from "@/lib/ably";
import Image from "next/image";
import type { Message } from "ably";

interface ChatWindowProps {
  chatId: string;
  messages: Messages[];
  loading?: boolean;
  onSendSuccess?: (m: Messages) => void;
}

export default function ChatWindow({
  chatId,
  messages,
  loading,
  onSendSuccess,
}: ChatWindowProps) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { data: session } = useSession();

  // auto-scroll to bottom on messages change
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  //realtime chat receiver by ably
  useEffect(() => {
    if (!chatId) {
      return;
    }

    const ably = getAbly();
    const channelName = `chat-${chatId}`;
    const channel = ably.channels.get(channelName);

    const handler = (msg: Message) => {
      try {
        const incoming: Messages = msg.data;
        onSendSuccess?.(incoming);
      } catch (error) {
        console.error("Ably message parse error:", error);
      }
    };

    channel.subscribe("message", handler);

    return () => {
      channel.unsubscribe("message", handler);
    };
  }, [chatId, onSendSuccess]);

  return (
    <div className="flex flex-col h-[93vh] max-h-screen scroll-smooth scrollbar-hidden">
      <div className="p-4 flex items-center gap-3 border-b bg-background">
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => router.back()}>
          <ArrowLeft size={18} />
        </Button>
        {messages.length > 0 ? (
          <div className="flex items-center gap-2">
            {/* Other user */}
            <Image
              src={
                messages[0].sender?._id === session?.user?._id
                  ? messages[0].receiver?.avatar || "/default-avatar.png"
                  : messages[0].sender?.avatar || "/default-avatar.png"
              }
              alt="avatar"
              width={16}
              height={16}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-semibold text-gray-800 capitalize">
              {messages[0].sender?._id === session?.user?._id
                ? messages[0].receiver?.username
                : messages[0].sender?.username}
            </span>
          </div>
        ) : (
          <span className="font-semibold text-gray-800">Chat</span>
        )}
      </div>

      {/* <ScrollArea className="flex-1 overflow-auto p-4 space-y-3 bg-white"> */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-4 space-y-3 bg-white scrollbar-hidden scroll-smooth">
        {loading ? (
          <div className="text-center text-sm text-gray-500">Loading...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-400">No messages yet.</div>
        ) : (
          messages.map((m) => (
            <ChatMessage
              key={m._id}
              text={m.text}
              me={m.sender?._id === session?.user?._id}
            />
          ))
        )}
      </div>
      {/* </ScrollArea> */}

      <MessageInput conversationId={chatId} onSendSuccess={onSendSuccess} />
    </div>
  );
}
