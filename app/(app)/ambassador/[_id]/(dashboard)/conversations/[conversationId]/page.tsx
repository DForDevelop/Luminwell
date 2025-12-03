"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Messages } from "@/types/chat";
import ChatWindow from "@/components/chat/ChatWindow";
import axios from "axios";

export default function ConversationPage() {
  const params = useParams() as { userId?: string; conversationId?: string };
  const conversationId = params?.conversationId;

  const [messages, setMessages] = useState<Messages[]>([]);
  const [loading, setLoading] = useState(true);

  // ---- CLEAN FETCH FUNCTION ----
  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `/api/conversation/get-message/${conversationId}`
      );
      setMessages(res.data.messages ?? []);
    } catch (err) {
      console.error("Fetch messages error:", err);
    }
  };

  // ---- CALL THE FUNCTION IN USEEFFECT ----
  useEffect(() => {
    if (!conversationId) return;

    let active = true;
    setLoading(true);

    fetchMessages().finally(() => {
      if (active) setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [conversationId]);

  const handleNewMessage = (m: Messages) => {
    setMessages((prev) => [...prev, m]);
  };

  return (
    <ChatWindow
      chatId={conversationId ?? ""}
      messages={messages}
      loading={loading}
      onSendSuccess={handleNewMessage}
    />
  );
}
