import { createContext } from "react";
import { ConnectionStatus } from "@/utils/enums";

interface ChatContextType {
	isConnected: boolean;
	connectionStatus: ConnectionStatus;
	sendMessage: (data: {
		conversationId: string;
		receiver: string;
		content: string;
	}) => void;
	typingUsers: Record<string, boolean>;
	setTyping: (
		conversationId: string,
		receiver: string,
		isTyping: boolean
	) => void;
	onlineUsers: Record<string, boolean>;
	markAsRead: (conversationId: string) => void;

	lastError: string | null;
	clearError: () => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(
	undefined
);
