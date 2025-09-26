import React, { useState, useEffect, useRef, useCallback } from "react";
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
	useStartConversation,
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
	const [conversationId, setConversationId] = useState<string | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const { user } = useAuth();
	const { sendMessage: sendRealTimeMessage, isConnected } = useChatContext();

	const startConversationMutation = useStartConversation();
	const sendMessageMutation = useSendMessage();
	const { data: messagesData, isLoading } = useMessages(conversationId || "", {
		enabled: !!conversationId, // Only fetch when conversationId exists
	});

	// Get messages from the query data
	const messages = React.useMemo(() => {
		return messagesData?.pages?.flatMap((page) => page.messages) || [];
	}, [messagesData]);

	// Auto scroll to bottom when new messages arrive
	// useEffect(() => {
	// 	if (messages.length > 0) {
	// 		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	// 	}
	// }, [messages]);

	// Scroll to bottom when modal opens and has messages
	useEffect(() => {
		if (isOpen && messages.length > 0) {
			setTimeout(() => {
				messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
			}, 100);
		}
	}, [isOpen, messages.length]);

	const startConversation = useCallback(async () => {
		try {
			const result = await startConversationMutation.mutateAsync({
				otherUserId,
			});
			setConversationId(result.conversation._id);
		} catch (error) {
			console.error("Failed to start conversation:", error);
		}
	}, [otherUserId, startConversationMutation]);

	// Start conversation when modal opens
	useEffect(() => {
		if (isOpen && otherUserId && !conversationId) {
			startConversation();
		}
	}, [isOpen, otherUserId, conversationId, startConversation]);

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
				<DialogHeader className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="relative">
								<Avatar className="h-12 w-12 border-2 border-white shadow-sm">
									<AvatarImage src="" />
									<AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
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
								<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
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
									const isOwnMessage = msg.sender.id === user?.id;
									return (
										<div
											key={msg._id}
											className={`flex ${
												isOwnMessage ? "justify-end" : "justify-start"
											}`}
										>
											<div
												className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
													isOwnMessage
														? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
														: "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
												}`}
											>
												<p className="text-sm leading-relaxed">{msg.content}</p>
												<p
													className={`text-xs mt-1.5 ${
														isOwnMessage ? "text-blue-100" : "text-gray-500"
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
							className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-full px-4 py-2"
							disabled={!conversationId || sendMessageMutation.isPending}
						/>
						<Button
							onClick={handleSendMessage}
							disabled={
								!message.trim() ||
								!conversationId ||
								sendMessageMutation.isPending
							}
							size="sm"
							className="rounded-full w-10 h-10 p-0 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
						>
							{sendMessageMutation.isPending ? (
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
							) : (
								<Send className="h-4 w-4" />
							)}
						</Button>
					</div>
					{!conversationId && (
						<p className="text-xs text-gray-500 mt-2 text-center">
							Starting conversation...
						</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ChatModal;
