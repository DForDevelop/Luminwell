"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ChatList from "@/components/chat/ChatList";
import { Conversation } from "@/types/chat";
import axios from "axios";

export default function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null
  );
  const pathname = usePathname();

  // FIX: Should match "/conversation/123", not "/conversations/"
  const parts = pathname?.split("/");

  // Check if URL ends with conversation ID
  const hasConversation =
    parts?.includes("conversations") && parts.length === 5;

  const fetchConversations = async () => {
    try {
      const response = await axios.get("/api/conversation/get-conversation");
      setConversations(response.data.conversations ?? []);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <div className="h-screen w-full flex bg-gray-100">
      {/* LEFT: ChatList */}
      <div
        className={`
          bg-white border-r transition-all duration-200
          md:block md:w-[20%]
          ${hasConversation ? "hidden" : "block w-full"}
        `}>
        <ChatList conversations={conversations} />
      </div>

      {/* RIGHT: children (chat window or placeholder) */}
      <div
        className={`
          w-full md:w-[80%] transition-all duration-200
          ${hasConversation ? "block w-full" : "hidden md:block"}
        `}>
        {children}
      </div>
    </div>
  );
}
