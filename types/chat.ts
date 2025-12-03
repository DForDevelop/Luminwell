export interface PopulatedChatUser {
    _id: string;
    username: string;
    avatar?: string;
}

export interface Conversation {
    _id: string;
    participants: PopulatedChatUser[];
    lastMessage?: Messages;
}

export interface Messages {
    _id: string;
    sender: PopulatedChatUser;
    receiver: PopulatedChatUser;
    conversationId: string;
    text: string;
    createdAt: string;
}