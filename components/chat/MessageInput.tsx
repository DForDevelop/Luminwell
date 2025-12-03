"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import axios from "axios";
import { Messages } from "@/types/chat";
import { useSession } from "next-auth/react";
import { getAbly } from "@/lib/ably";
interface MessageInputProps {
  conversationId: string;
  onSendSuccess?: (m: Messages) => void;
}

export default function MessageInput({
  conversationId,
  onSendSuccess,
}: MessageInputProps) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  const sendMessage = async () => {
    if (!text.trim() || !conversationId) return;
    if (!user?._id) return;
    setSending(true);
    try {
      const res = await axios.post("/api/conversation/send-message", {
        conversationId,
        text,
      });
      // expected response to include the new message
      const newMsg: Messages = res.data.message ?? res.data;

      // Ensure sender has proper structure
      if (!newMsg.sender || typeof newMsg.sender === "string") {
        newMsg.sender = {
          _id: user?._id,
          username: user?.name ?? "User",
          avatar: user?.image ?? "",
        };
      }

      //realtime chat component from ably
      try {
        const ably = getAbly();
        const channelName = `chat-${conversationId}`;
        const channel = ably.channels.get(channelName);

        channel.publish("message", newMsg);
      } catch (error) {
        console.error("ably publish error:", error);
      }
      setText("");
    } catch (err) {
      console.error("Send message error:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-3 border-t bg-background flex gap-2">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
      />
      <Button onClick={sendMessage} disabled={sending || !text.trim()}>
        <Send size={16} />
      </Button>
    </div>
  );
}
