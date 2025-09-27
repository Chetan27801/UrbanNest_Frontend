import io, { Socket } from "socket.io-client";
import { store } from "@/store";
import toast from "react-hot-toast";
import { UserStatus } from "@/utils/enums";

class SocketService {
	socket: typeof Socket | null = null;
	isConnecting = false;

	connect() {
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
		console.log("🔌 Connecting to socket server:", socketUrl);

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

	private setupEventListeners() {
		if (!this.socket) return;
		const userId = store.getState().auth.user?.id;

		this.socket.on("connect", () => {
			console.log("🔌 Socket connected, joining room for user:", userId);
			if (!this.socket || !userId) return;

			// Send joinRoom event with correct data structure
			this.socket.emit("joinRoom", {
				type: "chat",
				event: "joinRoom",
				data: {
					userId: userId,
				},
			});
		});

		this.socket.on("disconnect", (reason: string) => {
			console.log("🔌 Disconnected from socket:", reason);
			this.isConnecting = false;
			this.socket = null;
		});

		this.socket.on("connect_error", (error: any) => {
			console.error("🔌 Connection error:", error);
			this.isConnecting = false;
			this.socket = null;
		});

		this.socket.on("connected", (data: unknown) => {
			console.log("✅ Connected to socket server:", data);
		});

		this.socket.on("error", (error: any) => {
			console.error("🔌 Socket error:", error);
		});
	}

	disconnect() {
		if (this.socket) {
			this.socket.disconnect();
			this.socket = null;
			this.isConnecting = false;
		}
	}

	//message handling

	sendMessage(data: {
		conversationId: string;
		sender: string;
		receiver: string;
		content: string;
	}) {
		console.log("📤 Sending message via socket:", data);
		this.socket?.emit("sendMessage", {
			type: "chat",
			event: "sendMessage",
			data: data,
		});
	}

	onNewMessage(callback: (data: unknown) => void) {
		this.socket?.on("newMessage", callback);
	}

	onMessageAck(callback: (data: unknown) => void) {
		this.socket?.on("messageAck", callback);
	}

	onMessageError(callback: (data: unknown) => void) {
		this.socket?.on("messageError", callback);
	}

	//typing indicator
	sendTyping(data: {
		conversationId: string;
		sender: string;
		receiver: string;
		isTyping: boolean;
	}) {
		this.socket?.emit("typing", data);
	}

	onTyping(callback: (data: unknown) => void) {
		this.socket?.on("typing", callback);
	}

	//mark as read
	markAsRead(conversationId: string) {
		this.socket?.emit("markAsRead", { conversationId });
	}

	onMessageRead(callback: (data: unknown) => void) {
		this.socket?.on("messageRead", callback);
	}

	//update status
	updateStatus(status: UserStatus) {
		this.socket?.emit("updateStatus", { status });
	}

	onUserStatusUpdate(callback: (data: unknown) => void) {
		this.socket?.on("userStatusUpdate", callback);
	}

	//remove listeners
	removeAllListeners() {
		this.socket?.removeAllListeners();
	}

	isConnected() {
		return this.socket?.connected || false;
	}
}

export const socketService = new SocketService();
