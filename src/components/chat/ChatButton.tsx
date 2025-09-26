import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import ChatModal from "./ChatModal";

interface ChatButtonProps {
	otherUserId: string;
	otherUserName: string;
	otherUserRole: string;
	variant?: "default" | "outline" | "ghost" | "secondary";
	size?: "sm" | "default" | "lg";
	className?: string;
	children?: React.ReactNode; // Allow custom button content
}

const ChatButton: React.FC<ChatButtonProps> = ({
	otherUserId,
	otherUserName,
	otherUserRole,
	variant = "default",
	size = "default",
	className = "",
	children,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenChat = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Button
				onClick={handleOpenChat}
				variant={variant}
				size={size}
				className={`flex items-center gap-2 ${className}`}
			>
				{children ? (
					children
				) : (
					<>
						<MessageCircle className="h-4 w-4" />
						Chat
					</>
				)}
			</Button>

			{isModalOpen && (
				<ChatModal
					otherUserId={otherUserId}
					otherUserName={otherUserName}
					otherUserRole={otherUserRole}
					isOpen={isModalOpen}
					onClose={handleCloseModal}
				/>
			)}
		</>
	);
};

export default ChatButton;
