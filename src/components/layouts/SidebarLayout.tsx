import React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { User } from "@/types/auth";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useLogout } from "@/services/authService";

type SidebarLayoutProps = {
	children: React.ReactNode;
	menuItems: {
		id: string;
		title: string;
		icon: React.ReactNode;
		url: string;
	}[];
	user: User | null;
	activeView?: string;
	handleMenuClick?: (view: string) => void;
};

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
	children,
	menuItems,
	user,
	activeView,
	handleMenuClick,
}) => {
	let breadcrumbText = "Tenant";
	if (user?.role === "admin") {
		breadcrumbText = "Admin";
	} else if (user?.role === "landlord") {
		breadcrumbText = "Landlord";
	} else if (user?.role === "tenant") {
		breadcrumbText = "Tenant";
	}

	const { mutate: logout } = useLogout();

	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarHeader className="border-b border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-cyan-950 shadow-sm">
					<div className="flex items-center gap-3 px-4 py-4">
						{/* Avatar */}
						<Avatar className="h-10 w-10 ring-2 ring-cyan-500/20 shadow-sm">
							<AvatarImage
								src={user?.avatar || ""}
								alt={user?.name || "User"}
								className="object-cover"
							/>
							<AvatarFallback className="bg-cyan-600 text-white font-semibold">
								{user?.name?.charAt(0) || "U"}
							</AvatarFallback>
						</Avatar>

						{/* User info */}
						<div className="flex-1 min-w-0">
							<h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
								{user?.name || "User Dashboard"}
							</h3>
							<p className="text-xs text-gray-600 dark:text-gray-400">
								{user?.email || "user@example.com"}
							</p>
						</div>
					</div>
				</SidebarHeader>

				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent>
							<SidebarMenu>
								{menuItems.map((item: (typeof menuItems)[number]) => (
									<SidebarMenuItem key={item.id} className="py-1 rounded-md">
										<SidebarMenuButton
											onClick={() => handleMenuClick?.(item.id)}
											className={
												activeView === item.id
													? "bg-cyan-600 text-white hover:bg-cyan-700 hover:text-white cursor-pointer shadow-md"
													: "hover:bg-cyan-200 hover:text-black cursor-pointer rounded-md hover:shadow-md"
											}
										>
											<span>{item.icon}</span>
											<span className="font-medium">{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>

				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<div
									onClick={() => logout()}
									className="text-red-500 hover:text-red-600 hover:bg-red-300 dark:hover:bg-red-950/20 cursor-pointer transition-all duration-200 font-medium px-3 py-2 rounded-md border border-transparent dark:hover:border-red-800"
								>
									<LogOut className="h-4 w-4" />
									<span>Logout</span>
								</div>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</Sidebar>

			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 px-4 shadow-sm justify-between border-b border-gray-300 dark:border-gray-800">
					<div className="flex items-center gap-2">
						<SidebarTrigger />
						<Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink className="cursor-pointer">
										{breadcrumbText} Dashboard
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>
										{menuItems.find((item) => item.id === activeView)?.title ||
											"Overview"}
									</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<div className="flex items-center gap-2">
						<Link to="/home">
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 border-cyan-300 text-cyan-600 hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition-all duration-200 shadow-sm hover:shadow-md"
							>
								<Home className="h-4 w-4" />
							</Button>
						</Link>
					</div>
				</header>

				<main>{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default SidebarLayout;
