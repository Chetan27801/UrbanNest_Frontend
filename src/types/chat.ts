import type { BroadcastStatus, BroadcastType, UserStatus } from "@/utils/enums";
import type { User } from "./auth";

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

export interface TypingData {
	conversationId: string;
	sender: string;
	receiver: string;
	isTyping: boolean;
	timestamp?: string;
}

export interface UserStatusUpdate {
	userId: string;
	status: UserStatus;
	timestamp: string;
}

export interface MessageAck {
	conversationId: string;
	success: boolean;
	messageId: string;
	source: BroadcastType;
	broadcast: BroadcastStatus;
}

export interface MessageRead {
	conversationId: string;
	readBy: string;
	timestamp: string;
	source: BroadcastType;
	broadcast: BroadcastStatus;
	readCount: number;
}

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
