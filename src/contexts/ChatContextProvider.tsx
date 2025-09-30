import { useCallback, useState, useEffect } from "react";
import { ConnectionStatus, UserStatus } from "@/utils/enums";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { socketService } from "@/services/socketService";
import { QUERY_KEYS } from "@/lib/queryClient";
import { toast } from "react-hot-toast";
import type {
	Message,
	MessageAck,
	MarkAsReadAck,
	MarkAsReadError,
	MessageRead,
	TypingData,
	UserStatusUpdate,
	SocketError,
	ConnectError,
	ConnectionResponse,
	MessageError,
} from "@/types/chat";
import { ChatContext } from "./ChatContext";

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

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isConnected, setIsConnected] = useState(false);
	const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
		ConnectionStatus.Disconnected
	);
	const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({});
	const [onlineUsers, setOnlineUsers] = useState<Record<string, boolean>>({});
	const [lastError, setLastError] = useState<string | null>(null);

	const { user, token } = useAuth();
	const queryClient = useQueryClient();

	const sendMessage = useCallback(
		(data: { conversationId: string; receiver: string; content: string }) => {
			if (!user || !token) {
				setLastError("User not authenticated");
				return;
			}

			socketService.sendMessage({ ...data, sender: user._id });
		},
		[user, token]
	);

	const setTyping = useCallback(
		(conversationId: string, receiver: string, isTyping: boolean) => {
			if (!user || !token) {
				setLastError("User not authenticated");
				return;
			}

			socketService.sendTyping({
				conversationId,
				receiver,
				isTyping,
				sender: user._id,
			});
		},
		[user, token]
	);

	const markAsRead = useCallback((conversationId: string) => {
		socketService.markAsRead(conversationId);
	}, []);

	const clearError = useCallback(() => {
		setLastError(null);
	}, []);

	const setupSocketListeners = useCallback(() => {
		// Connection events
		socketService.socket?.on("connect", () => {
			setIsConnected(true);
			setConnectionStatus(ConnectionStatus.Connected);
			setLastError(null);
		});

		socketService.socket?.on("disconnect", () => {
			setIsConnected(false);
			setConnectionStatus(ConnectionStatus.Disconnected);
		});

		socketService.onConnectError((error: ConnectError) => {
			console.error("🔌 ChatContext: Socket connection error:", error);
			setConnectionStatus(ConnectionStatus.Error);
			setLastError(error.message || "Connection error");
		});

		socketService.onConnected((data: ConnectionResponse) => {
			toast.success(data.message);
			setConnectionStatus(ConnectionStatus.Connected);
			setLastError(null);
		});

		socketService.onError((error: SocketError) => {
			setLastError(error.message || "Socket error");
			toast.error(error.message || "Socket error");
		});

		// Chat events
		socketService.onNewMessage((message: Message) => {
			console.log("💬 New message received:", message);

			// Invalidate and refetch messages
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.conversations,
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.messages(message.conversationId),
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.unreadCount,
			});
		});

		socketService.onTyping((typingData: TypingData) => {
			setTypingUsers((prev) => ({
				...prev,
				[typingData.sender]: typingData.isTyping,
			}));

			// Auto-clear typing indicator after 3 seconds
			if (typingData.isTyping) {
				setTimeout(() => {
					setTypingUsers((prev) => ({ ...prev, [typingData.sender]: false }));
				}, 3000);
			}
		});

		socketService.onUserStatusUpdate((statusUpdate: UserStatusUpdate) => {
			setOnlineUsers((prev) => ({
				...prev,
				[statusUpdate.userId]: statusUpdate.status === UserStatus.Online,
			}));
		});

		socketService.onMessageRead((messageRead: MessageRead) => {
			console.log("👁️ Messages marked as read:", messageRead);
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.unreadCount,
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.conversations,
			});
		});

		socketService.onMessageAck((ackData: MessageAck) => {
			console.log("✅ Message acknowledged:", ackData);
			// Optionally show success toast or update UI
		});

		socketService.onMarkAsReadAck((ackData: MarkAsReadAck) => {
			console.log("✅ Mark as read acknowledged:", ackData);
			// Invalidate queries to refresh unread counts
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.unreadCount,
			});
		});

		socketService.onMarkAsReadError((errorData: MarkAsReadError) => {
			console.error("❌ Mark as read error:", errorData);
			toast.error(errorData.message);
		});

		socketService.onMessageError((errorData: MessageError) => {
			console.error("❌ Message error:", errorData);
			toast.error(errorData.message);
		});
	}, [queryClient]);

	//Connection management
	useEffect(() => {
		if (user && token) {
			setConnectionStatus(ConnectionStatus.Connecting);
			socketService.connect();
			setupSocketListeners();
		} else {
			socketService.disconnect();
			setConnectionStatus(ConnectionStatus.Disconnected);
			setIsConnected(false);
		}

		return () => {
			socketService.removeAllListeners();
			socketService.disconnect();
		};
	}, [user, token, setupSocketListeners]);

	const contextValue: ChatContextType = {
		isConnected,
		connectionStatus,
		sendMessage,
		typingUsers,
		setTyping,
		onlineUsers,
		markAsRead,
		lastError,
		clearError,
	};

	return (
		<ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
	);
};
