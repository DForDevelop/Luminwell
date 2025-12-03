"use client";
const ChatMessage = ({ text, me }: { text: string; me: boolean }) => {
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-[80%] text-sm 
          ${me ? "bg-primary text-primary-foreground" : "bg-gray-200 text-gray-800"}`}>
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;
