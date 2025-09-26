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

		this.socket = io(import.meta.env.VITE_SOCKET_URL, {
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
			if (!this.socket) return;
			this.socket?.emit("joinRoom", userId);
		});

		this.socket.on("disconnect", (reason: string) => {
			console.log("Disconnected from socket", reason);
			this.isConnecting = false;
			this.socket = null;
		});

		this.socket.on("connect_error", (error: string) => {
			console.error("Connection error", error);
			this.isConnecting = false;
			this.socket = null;
		});

		this.socket.on("connected", (data: unknown) => {
			console.log("Connected to socket", data);
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
		this.socket?.emit("sendMessage", data);
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
