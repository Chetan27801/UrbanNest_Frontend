import {
	createContext,
	useCallback,
	useContext,
	useState,
	useEffect,
} from "react";
import { ConnectionStatus, UserStatus } from "@/utils/enums";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { socketService } from "@/services/socketService";
import { QUERY_KEYS } from "@/lib/queryClient";
import { toast } from "react-hot-toast";
import type {
	Message,
	MessageAck,
	TypingData,
	UserStatusUpdate,
	SocketError,
} from "@/types/chat";

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

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
	const context = useContext(ChatContext);
	if (!context) {
		throw new Error("useChatContext must be used within a ChatProvider");
	}
	return context;
};

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

			socketService.sendMessage({ ...data, sender: user.id });
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
				sender: user.id,
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

	//Connection management
	useEffect(() => {
		if (user && token) {
			console.log(
				"🔌 ChatContext: Initializing socket connection for user:",
				user.id
			);
			setConnectionStatus(ConnectionStatus.Connecting);
			socketService.connect();
			setupSocketListeners();
		} else {
			console.log("🔌 ChatContext: No user/token, disconnecting socket");
			socketService.disconnect();
			setConnectionStatus(ConnectionStatus.Disconnected);
			setIsConnected(false);
		}

		return () => {
			socketService.removeAllListeners();
			socketService.disconnect();
		};
	}, [user, token]);

	const setupSocketListeners = useCallback(() => {
		//Connection events

		socketService.socket?.on("connect", () => {
			console.log("🔌 ChatContext: Socket connected successfully");
			setIsConnected(true);
			setConnectionStatus(ConnectionStatus.Connected);
			setLastError(null);
		});

		socketService.socket?.on("disconnect", () => {
			console.log("🔌 ChatContext: Socket disconnected");
			setIsConnected(false);
			setConnectionStatus(ConnectionStatus.Disconnected);
		});

		socketService.socket?.on("connect_error", (error: any) => {
			console.error("🔌 ChatContext: Socket connection error:", error);
			setConnectionStatus(ConnectionStatus.Error);
			setLastError(error.message || "Connection error");
		});

		socketService.socket?.on("connected", (data: any) => {
			console.log("🔌 ChatContext: Received connected event:", data);
		});

		socketService.socket?.on("error", (error: any) => {
			console.error("🔌 ChatContext: Socket error:", error);
			setLastError(error.message || "Socket error");
		});

		//Chat events
		socketService.onNewMessage((message: unknown) => {
			const msg = message as Message;
			console.log("New message received:", msg);

			//Invalidate and refetch messages
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.conversations,
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.messages(msg.conversationId),
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.unreadCount,
			});

			//show notification
			if (msg.sender.id !== user?.id) {
				toast.success(`New message received from ${msg.sender?.name}`);
			}
		});

		socketService.onTyping((data: unknown) => {
			const typingData = data as TypingData;
			setTypingUsers((prev) => ({
				...prev,
				[typingData.sender]: typingData.isTyping,
			}));

			if (typingData.isTyping) {
				setTimeout(() => {
					setTypingUsers((prev) => ({ ...prev, [typingData.sender]: false }));
				}, 3000);
			}
		});

		socketService.onUserStatusUpdate((data: unknown) => {
			const statusUpdate = data as UserStatusUpdate;
			setOnlineUsers((prev) => ({
				...prev,
				[statusUpdate.userId]: statusUpdate.status === UserStatus.Online,
			}));
		});

		socketService.onMessageRead(() => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.unreadCount,
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.conversations,
			});
		});

		socketService.onMessageAck((data: unknown) => {
			const ackData = data as MessageAck;
			console.log("Message acknowledged:", ackData);
		});

		socketService.onMessageError((data: unknown) => {
			const errorData = data as SocketError;
			console.log("Message error:", errorData);
			toast.error(errorData.message);
		});
	}, [queryClient, user]);

	// Setup socket listeners when dependencies change
	useEffect(() => {
		if (user && token) {
			setupSocketListeners();
		}
	}, [setupSocketListeners, user, token]);

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
