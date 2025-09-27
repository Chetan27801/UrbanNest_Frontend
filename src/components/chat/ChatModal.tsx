import React, { useState, useEffect, useRef, useMemo } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useChatContext } from "@/contexts/ChatContext";
import {
	useConversationWithUser,
	useMessages,
	useSendMessage,
	type Message,
} from "@/services/chatService";
import { formatDistanceToNow } from "date-fns";

interface ChatModalProps {
	otherUserId: string;
	otherUserName: string;
	otherUserRole: string;
	isOpen: boolean;
	onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({
	otherUserId,
	otherUserName,
	otherUserRole,
	isOpen,
	onClose,
}) => {
	const [message, setMessage] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const { user } = useAuth();
	const { sendMessage: sendRealTimeMessage, isConnected } = useChatContext();

	// Use React Query's built-in caching - much simpler!
	const {
		data: conversationData,
		isLoading: isLoadingConversation,
		error: conversationError,
	} = useConversationWithUser(
		otherUserId,
		isOpen // Only enabled when modal is open
	);

	const conversationId = conversationData?.conversation?._id;

	// Show error if conversation creation failed
	useEffect(() => {
		if (conversationError) {
			console.error("❌ Failed to get/create conversation:", conversationError);
		}
	}, [conversationError]);
	const sendMessageMutation = useSendMessage();

	// Get messages from the query data
	const { data: messagesData, isLoading } = useMessages(conversationId || "", {
		enabled: !!conversationId, // Only fetch when conversationId exists
	});

	// Get messages from the query data
	const messages = useMemo(() => {
		return messagesData?.pages?.flatMap((page) => page.messages) || [];
	}, [messagesData]);

	// Track previous messages to detect new ones
	const prevMessagesRef = useRef<Message[]>([]);
	const hasOpenedBefore = useRef(false);

	// Scroll to bottom when modal first opens
	useEffect(() => {
		if (isOpen && messages.length > 0 && !hasOpenedBefore.current) {
			setTimeout(() => {
				messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
				hasOpenedBefore.current = true;
			}, 10);
		}
	}, [isOpen, messages.length]);

	// Scroll to bottom when new messages arrive
	useEffect(() => {
		if (isOpen && messages.length > 0 && hasOpenedBefore.current) {
			const prevMessages = prevMessagesRef.current;

			// Check if there are new messages by comparing the last message ID
			if (prevMessages.length > 0 && messages.length > 0) {
				const lastPrevMessage = prevMessages[prevMessages.length - 1];
				const lastCurrentMessage = messages[messages.length - 1];

				if (lastPrevMessage._id !== lastCurrentMessage._id) {
					// New message detected - scroll to bottom
					setTimeout(() => {
						messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
					}, 100);
				}
			}
		}

		// Update the previous messages reference
		prevMessagesRef.current = [...messages];
	}, [messages, isOpen]);

	// Reset tracking when modal closes
	useEffect(() => {
		if (!isOpen) {
			hasOpenedBefore.current = false;
			prevMessagesRef.current = [];
		}
	}, [isOpen]);

	const handleSendMessage = async () => {
		if (!message.trim() || !user || !conversationId) return;

		const messageContent = message.trim();
		setMessage("");

		try {
			// Send via REST API
			await sendMessageMutation.mutateAsync({
				conversationId,
				receiverId: otherUserId,
				content: messageContent,
			});

			// Also send via WebSocket for real-time delivery if connected
			if (isConnected) {
				sendRealTimeMessage({
					conversationId,
					receiver: otherUserId,
					content: messageContent,
				});
			}
		} catch (error) {
			console.error("Failed to send message:", error);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	const formatMessageTime = (dateString: string) => {
		return formatDistanceToNow(new Date(dateString), { addSuffix: true });
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-lg h-[700px] flex flex-col p-0 gap-0 overflow-hidden">
				{/* Header */}
				<DialogHeader className="p-4 border-b bg-gradient-to-r from-cyan-100 to-cyan-50 rounded-t-lg">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="relative">
								<Avatar className="h-12 w-12 border-2 border-white shadow-sm">
									<AvatarImage src="" />
									<AvatarFallback className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white font-semibold">
										{getInitials(otherUserName)}
									</AvatarFallback>
								</Avatar>
								{/* Online status indicator */}
								<div
									className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
										isConnected ? "bg-green-500" : "bg-gray-400"
									}`}
								/>
							</div>
							<div>
								<DialogTitle className="text-lg font-semibold text-gray-800">
									{otherUserName}
								</DialogTitle>
								<p className="text-sm text-gray-600 capitalize flex items-center gap-1">
									{otherUserRole}
									<span className="text-xs text-gray-500">
										• {isConnected ? "Online" : "Offline"}
									</span>
								</p>
							</div>
						</div>
					</div>
				</DialogHeader>

				{/* Messages Area */}
				<ScrollArea className="flex-1 bg-gray-50/30 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
					<div className="p-4">
						{isLoading ? (
							<div className="flex justify-center items-center h-32">
								<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-600"></div>
							</div>
						) : messages.length === 0 ? (
							<div className="flex flex-col items-center justify-center h-32 text-gray-500">
								<div className="bg-white rounded-full p-4 mb-3 shadow-sm">
									<MessageCircle className="h-8 w-8 text-gray-400" />
								</div>
								<p className="text-center font-medium">No messages yet</p>
								<p className="text-center text-sm text-gray-400">
									Start the conversation by sending a message!
								</p>
							</div>
						) : (
							<div className="space-y-3">
								{messages.map((msg: Message) => {
									const isOwnMessage = msg.sender._id === user?._id;
									return (
										<div
											key={msg._id}
											className={`flex ${
												isOwnMessage ? "justify-end" : "justify-start"
											}`}
										>
											<div
												className={`max-w-[75%] px-4 py-3 shadow-sm ${
													isOwnMessage
														? "bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl rounded-br-md ml-auto"
														: "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-2xl rounded-bl-md mr-auto"
												}`}
											>
												<p className="text-sm leading-relaxed">{msg.content}</p>
												<p
													className={`text-xs mt-1.5 ${
														isOwnMessage ? "text-green-100" : "text-blue-100"
													}`}
												>
													{formatMessageTime(msg.createdAt)}
												</p>
											</div>
										</div>
									);
								})}
								<div ref={messagesEndRef} />
							</div>
						)}
					</div>
				</ScrollArea>

				{/* Message Input */}
				<div className="p-4 border-t bg-white">
					<div className="flex space-x-3">
						<Input
							placeholder="Type your message..."
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							onKeyPress={handleKeyPress}
							className="flex-1 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 rounded-full px-4 py-2"
							disabled={
								!conversationId ||
								sendMessageMutation.isPending ||
								isLoadingConversation
							}
						/>
						<Button
							onClick={handleSendMessage}
							disabled={
								!message.trim() ||
								!conversationId ||
								sendMessageMutation.isPending ||
								isLoadingConversation
							}
							size="sm"
							className="rounded-full w-10 h-10 p-0 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-300"
						>
							{sendMessageMutation.isPending ? (
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
							) : (
								<Send className="h-4 w-4" />
							)}
						</Button>
					</div>
					{(!conversationId || isLoadingConversation) && (
						<p className="text-xs text-gray-500 mt-2 text-center">
							{isLoadingConversation
								? "Starting conversation..."
								: "Loading..."}
						</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ChatModal;
