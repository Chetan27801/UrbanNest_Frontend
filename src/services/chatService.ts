import { QUERY_KEYS, queryClient } from "@/lib/queryClient";
import type { User } from "@/types/auth";
import api from "@/utils/apiAxios";
import API_ENDPOINTS from "@/utils/apiConstant";
import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export interface Conversation {
	_id: string;
	participants: User[];
	lastMessage: Message;
	createdAt: string;
	updatedAt: string;
}

export interface Message {
	_id: string;
	conversationId: string;
	sender: User;
	receiver: User;
	content: string;
	isRead: boolean;
	createdAt: string;
	updatedAt: string;
}

export const chatApiFunctions = {
	startConversation: async (data: { otherUserId: string }) => {
		const response = await api.post(
			API_ENDPOINTS.CHAT.START_CONVERSATION,
			data
		);
		return response.data;
	},
	getConversations: async () => {
		const response = await api.get(API_ENDPOINTS.CHAT.GET_CONVERSATIONS);
		return response.data;
	},
	sendMessage: async (data: {
		conversationId: string;
		receiverId: string;
		content: string;
	}) => {
		const response = await api.post(API_ENDPOINTS.CHAT.SEND_MESSAGE, data);
		return response.data;
	},
	getMessages: async (conversationId: string, page: number, limit: number) => {
		const response = await api.get(
			API_ENDPOINTS.CHAT.GET_MESSAGES(conversationId, page, limit)
		);
		return response.data;
	},
	markAsRead: async (conversationId: string) => {
		const response = await api.put(
			API_ENDPOINTS.CHAT.MARK_AS_READ(conversationId)
		);
		return response.data;
	},
	getUnreadCount: async () => {
		const response = await api.get(API_ENDPOINTS.CHAT.GET_UNREAD_COUNT);
		return response.data;
	},
};

export const useStartConversation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: chatApiFunctions.startConversation,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.conversations,
			});
			toast.success("Conversation started!");
		},
		onError: (error) => {
			toast.error(error.message || "Failed to start conversation");
		},
	});
};

export const useConversations = () => {
	return useQuery({
		queryKey: QUERY_KEYS.chat.conversations,
		queryFn: chatApiFunctions.getConversations,
		staleTime: 1 * 60 * 1000,
	});
};

export const useMessages = (
	conversationId: string,
	options?: { enabled?: boolean }
) => {
	return useInfiniteQuery({
		queryKey: QUERY_KEYS.chat.messages(conversationId),
		queryFn: ({ pageParam = 1 }) =>
			chatApiFunctions.getMessages(conversationId, pageParam as number, 20),
		staleTime: 1 * 60 * 1000,
		initialPageParam: 1,
		enabled: options?.enabled ?? true, // Default to enabled unless explicitly disabled
		getNextPageParam: (lastPage) => {
			if (lastPage.pagination.hasNextPage) {
				return lastPage.pagination.page + 1;
			}
			return undefined;
		},
	});
};

export const useSendMessage = () => {
	return useMutation({
		mutationFn: chatApiFunctions.sendMessage,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.messages(data.conversationId),
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.sendMessage(data.conversationId),
			});
			toast.success("Message sent!");
		},
		onError: (error) => {
			toast.error(error.message || "Failed to send message");
		},
	});
};

export const useMarkAsRead = () => {
	return useMutation({
		mutationFn: chatApiFunctions.markAsRead,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.messages(data.conversationId),
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.chat.sendMessage(data.conversationId),
			});
			toast.success("Message marked as read!");
		},
		onError: (error) => {
			toast.error(error.message || "Failed to mark message as read");
		},
	});
};

export const useGetUnreadCount = () => {
	return useQuery({
		queryKey: QUERY_KEYS.chat.unreadCount,
		queryFn: chatApiFunctions.getUnreadCount,
		refetchInterval: 30 * 1000,
	});
};
