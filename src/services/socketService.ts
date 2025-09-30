import io from "socket.io-client";
import type { Socket } from "socket.io-client";
import { store } from "@/store";
import toast from "react-hot-toast";
import { UserStatus } from "@/utils/enums";
import type {
	SocketMessage,
	SendTypingData,
	JoinRoomData,
	Message,
	MessageAck,
	MessageError,
	TypingData,
	MarkAsReadAck,
	MarkAsReadError,
	MessageRead,
	UserStatusUpdate,
	ConnectionResponse,
	SocketError,
	ConnectError,
} from "@/types/chat";

class SocketService {
	socket: typeof Socket | null = null;
	isConnecting = false;

	connect(): void {
		if (this.socket?.connected || this.isConnecting) return;

		this.isConnecting = true;
		const state = store.getState();
		const token = state.auth.token;

		if (!token) {
			toast.error("Please login to continue");
			this.isConnecting = false;
			return;
		}

		// Use backend URL if VITE_SOCKET_URL is not defined
		const socketUrl =
			import.meta.env.VITE_SOCKET_URL || "http://localhost:8000";

		this.socket = io(socketUrl, {
			auth: {
				token,
			},
			transports: ["websocket", "polling"],
			timeout: 20000,
			forceNew: true,
		});

		this.setupEventListeners();
		this.isConnecting = false;
	}

	private setupEventListeners(): void {
		if (!this.socket) return;
		const userId = store.getState().auth.user?._id;

		this.socket.on("connect", () => {
			if (!this.socket || !userId) return;

			// Send joinRoom event with correct data structure
			const joinData: JoinRoomData = {
				type: "chat",
				event: "joinRoom" as const,
				data: {
					userId: userId,
				},
			};
			this.socket.emit("joinRoom", joinData);
		});

		this.socket.on("disconnect", (reason: string) => {
			toast.error(`Socket disconnected: ${reason}`);
			this.isConnecting = false;
			this.socket = null;
		});

		this.socket.on("connect_error", (error: ConnectError) => {
			console.error("🔌 Connection error:", error);
			this.isConnecting = false;
			this.socket = null;
		});

		this.socket.on("connected", (data: ConnectionResponse) => {
			toast.success(data.message);
		});

		this.socket.on("error", (error: SocketError) => {
			console.error("🔌 Socket error:", error);
		});
	}

	disconnect(): void {
		if (this.socket) {
			this.socket.disconnect();
			this.socket = null;
			this.isConnecting = false;
		}
	}

	// Message handling methods
	sendMessage(data: SocketMessage): void {
		if (!this.socket?.connected) {
			console.warn("🔌 Cannot send message: Socket not connected");
			return;
		}
		this.socket.emit("sendMessage", data);
	}

	onNewMessage(callback: (data: Message) => void): void {
		this.socket?.on("newMessage", callback);
	}

	onMessageAck(callback: (data: MessageAck) => void): void {
		this.socket?.on("messageAck", callback);
	}

	onMessageError(callback: (data: MessageError) => void): void {
		this.socket?.on("messageError", callback);
	}

	// Typing indicator methods
	sendTyping(data: SendTypingData): void {
		if (!this.socket?.connected) {
			console.warn("🔌 Cannot send typing indicator: Socket not connected");
			return;
		}
		this.socket.emit("typing", data);
	}

	onTyping(callback: (data: TypingData) => void): void {
		this.socket?.on("typing", callback);
	}

	// Mark as read methods
	markAsRead(conversationId: string): void {
		if (!this.socket?.connected) {
			console.warn("🔌 Cannot mark as read: Socket not connected");
			return;
		}
		this.socket.emit("markAsRead", { conversationId });
	}

	onMarkAsReadAck(callback: (data: MarkAsReadAck) => void): void {
		this.socket?.on("markAsReadAck", callback);
	}

	onMarkAsReadError(callback: (data: MarkAsReadError) => void): void {
		this.socket?.on("markAsReadError", callback);
	}

	onMessageRead(callback: (data: MessageRead) => void): void {
		this.socket?.on("messageRead", callback);
	}

	// Status update methods
	updateStatus(status: UserStatus): void {
		if (!this.socket?.connected) {
			console.warn("🔌 Cannot update status: Socket not connected");
			return;
		}
		this.socket.emit("updateStatus", { status });
	}

	onUserStatusUpdate(callback: (data: UserStatusUpdate) => void): void {
		this.socket?.on("userStatusUpdate", callback);
	}

	// Connection event listeners
	onConnected(callback: (data: ConnectionResponse) => void): void {
		this.socket?.on("connected", callback);
	}

	onError(callback: (data: SocketError) => void): void {
		this.socket?.on("error", callback);
	}

	onConnectError(callback: (data: ConnectError) => void): void {
		this.socket?.on("connect_error", callback);
	}

	// Utility methods
	removeAllListeners(): void {
		this.socket?.removeAllListeners();
	}

	isConnected(): boolean {
		return this.socket?.connected || false;
	}

	// Get socket instance for advanced usage
	getSocket(): typeof Socket | null {
		return this.socket;
	}
}

export const socketService = new SocketService();
