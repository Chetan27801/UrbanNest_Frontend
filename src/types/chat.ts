import type { BroadcastStatus, BroadcastType, UserStatus } from "@/utils/enums";
import type { User } from "./auth";

// Socket Event Types
export const SocketEventTypes = {
	JoinRoom: "joinRoom",
	Connected: "connected",
	Error: "error",
	SendMessage: "sendMessage",
	NewMessage: "newMessage",
	MessageAck: "messageAck",
	MessageError: "messageError",
	Typing: "typing",
	MarkAsRead: "markAsRead",
	MarkAsReadAck: "markAsReadAck",
	MarkAsReadError: "markAsReadError",
	MessageRead: "messageRead",
	UserStatusUpdate: "userStatusUpdate",
	UpdateStatus: "updateStatus",
	Disconnect: "disconnect",
	ConnectError: "connect_error",
} as const;
export type SocketEventTypes =
	(typeof SocketEventTypes)[keyof typeof SocketEventTypes];

// Core Message Interface
export interface Message {
	_id: string;
	conversationId: string;
	sender: User;
	receiver: User;
	content: string;
	isRead: boolean;
	createdAt: string;
	updatedAt: string;
	source: BroadcastType;
	broadcast: BroadcastStatus;
}

// Socket Message Interface (for sending)
export interface SocketMessage {
	conversationId: string;
	sender: string;
	receiver: string;
	content: string;
}

// Typing Indicator Interfaces
export interface TypingData {
	conversationId: string;
	sender: string;
	receiver?: string;
	isTyping: boolean;
	timestamp?: string;
}

export interface SendTypingData {
	conversationId: string;
	sender: string;
	receiver: string;
	isTyping: boolean;
}

// User Status Interfaces
export interface UserStatusUpdate {
	userId: string;
	status: UserStatus;
	timestamp: string;
}

export interface UpdateStatusData {
	status: UserStatus;
}

// Message Acknowledgment Interfaces
export interface MessageAck {
	success: boolean;
	messageId: string;
	conversationId: string;
	source: BroadcastType;
	broadcast: BroadcastStatus;
}

// Mark As Read Interfaces
export interface MarkAsReadRequest {
	conversationId: string;
}

export interface MarkAsReadAck {
	success: boolean;
	conversationId: string;
	messagesMarked: number;
	source: BroadcastType;
	broadcast: BroadcastStatus;
}

export interface MarkAsReadError {
	message: string;
	code: string;
	conversationId?: string;
	error?: string;
}

// Message Read Event Interface
export interface MessageRead {
	conversationId: string;
	readBy: string;
	timestamp: string;
	source: BroadcastType;
	broadcast: BroadcastStatus;
	readCount: number;
}

// Connection Interfaces
export interface ConnectionResponse {
	message: string;
	userId: string;
	socketId: string;
}

export interface JoinRoomData {
	type: string;
	event: "joinRoom";
	data: {
		userId: string;
	};
}

// Error Interfaces
export interface MessageError {
	message: string;
	code: string;
	conversationId?: string;
	error?: string;
}

export interface SocketError {
	message: string;
	code: string;
	error?: string;
}

export interface ConnectError {
	message: string;
	code: string;
	type?: string;
	description?: string;
}

// Union Types for Event Handlers
export type SocketEventData =
	| Message
	| TypingData
	| UserStatusUpdate
	| MessageAck
	| MarkAsReadAck
	| MarkAsReadError
	| MessageRead
	| ConnectionResponse
	| MessageError
	| SocketError
	| ConnectError;

// Socket Service Method Types
export interface SocketServiceMethods {
	sendMessage: (data: SocketMessage) => void;
	sendTyping: (data: SendTypingData) => void;
	markAsRead: (conversationId: string) => void;
	updateStatus: (status: UserStatus) => void;
	joinRoom: (data: JoinRoomData) => void;
}

// Event Listener Types
export interface SocketEventListeners {
	onNewMessage: (callback: (data: Message) => void) => void;
	onMessageAck: (callback: (data: MessageAck) => void) => void;
	onMessageError: (callback: (data: MessageError) => void) => void;
	onTyping: (callback: (data: TypingData) => void) => void;
	onMarkAsReadAck: (callback: (data: MarkAsReadAck) => void) => void;
	onMarkAsReadError: (callback: (data: MarkAsReadError) => void) => void;
	onMessageRead: (callback: (data: MessageRead) => void) => void;
	onUserStatusUpdate: (callback: (data: UserStatusUpdate) => void) => void;
	onConnected: (callback: (data: ConnectionResponse) => void) => void;
	onError: (callback: (data: SocketError) => void) => void;
	onConnectError: (callback: (data: ConnectError) => void) => void;
}
