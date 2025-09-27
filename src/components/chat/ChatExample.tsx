import React from "react";
import ChatButton from "./ChatButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Example component showing how to use ChatButton in different scenarios
 * This is for demonstration purposes and can be removed in production
 */
const ChatExample: React.FC = () => {
	return (
		<div className="container mx-auto px-4 py-8 space-y-6">
			<h1 className="text-2xl font-bold mb-6">Chat Button Examples</h1>

			{/* Example 1: Basic Chat Button */}
			<Card>
				<CardHeader>
					<CardTitle>Basic Chat Button</CardTitle>
				</CardHeader>
				<CardContent>
					<ChatButton
						otherUserId="507f1f77bcf86cd799439011"
						otherUserName="John Smith"
						otherUserRole="landlord"
					/>
				</CardContent>
			</Card>

			{/* Example 2: Outline Variant */}
			<Card>
				<CardHeader>
					<CardTitle>Outline Variant</CardTitle>
				</CardHeader>
				<CardContent>
					<ChatButton
						otherUserId="507f1f77bcf86cd799439012"
						otherUserName="Sarah Johnson"
						otherUserRole="tenant"
						variant="outline"
					/>
				</CardContent>
			</Card>

			{/* Example 3: Different Sizes */}
			<Card>
				<CardHeader>
					<CardTitle>Different Sizes</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<p className="text-sm text-gray-600 mb-2">Small:</p>
						<ChatButton
							otherUserId="507f1f77bcf86cd799439013"
							otherUserName="Mike Wilson"
							otherUserRole="landlord"
							size="sm"
						/>
					</div>
					<div>
						<p className="text-sm text-gray-600 mb-2">Default:</p>
						<ChatButton
							otherUserId="507f1f77bcf86cd799439014"
							otherUserName="Emily Davis"
							otherUserRole="tenant"
							size="default"
						/>
					</div>
					<div>
						<p className="text-sm text-gray-600 mb-2">Large:</p>
						<ChatButton
							otherUserId="507f1f77bcf86cd799439015"
							otherUserName="David Brown"
							otherUserRole="landlord"
							size="lg"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Example 4: Full Width */}
			<Card>
				<CardHeader>
					<CardTitle>Full Width Button</CardTitle>
				</CardHeader>
				<CardContent>
					<ChatButton
						otherUserId="507f1f77bcf86cd799439016"
						otherUserName="Lisa Anderson"
						otherUserRole="tenant"
						variant="outline"
						size="lg"
						className="w-full"
					/>
				</CardContent>
			</Card>

			{/* Usage Instructions */}
			<Card>
				<CardHeader>
					<CardTitle>Usage Instructions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="prose prose-sm">
						<h4>Props:</h4>
						<ul>
							<li>
								<strong>otherUserId</strong> (required): The ID of the user to
								chat with
							</li>
							<li>
								<strong>otherUserName</strong> (required): Display name of the
								other user
							</li>
							<li>
								<strong>otherUserRole</strong> (required): Role of the other
								user ("tenant" or "landlord")
							</li>
							<li>
								<strong>variant</strong> (optional): Button style - "default",
								"outline", "ghost", "secondary"
							</li>
							<li>
								<strong>size</strong> (optional): Button size - "sm", "default",
								"lg"
							</li>
							<li>
								<strong>className</strong> (optional): Additional CSS classes
							</li>
						</ul>

						<h4>Features:</h4>
						<ul>
							<li>✅ Automatically starts conversations between users</li>
							<li>✅ Real-time messaging with Socket.IO</li>
							<li>✅ Fallback to REST API if Socket.IO is disconnected</li>
							<li>✅ Clean, modern modal interface</li>
							<li>✅ Message history with pagination</li>
							<li>✅ Connection status indicator</li>
							<li>✅ Auto-scroll to new messages</li>
							<li>✅ Enter key to send messages</li>
						</ul>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default ChatExample;
