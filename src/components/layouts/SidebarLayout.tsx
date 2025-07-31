import React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
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
				<SidebarHeader>
					<div className="flex items-center gap-3 px-4 py-4 bg-gradient-to-r from-cyan-50 to-slate-50 dark:from-cyan-950/20 dark:to-slate-950/20 text-sidebar-accent-foreground border-b border-sidebar-border shadow-sm">
						<Avatar className="h-10 w-10 ring-2 ring-cyan-500/30 shadow-sm">
							<AvatarImage
								src={user?.avatar || ""}
								alt={user?.name || "User"}
							/>
							<AvatarFallback className="bg-cyan-600 text-white font-semibold shadow-sm">
								{user?.name?.charAt(0) || "U"}
							</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold text-sidebar-accent-foreground">
								{user?.name || "User Dashboard"}
							</span>
							<span className="truncate text-xs text-sidebar-muted-foreground opacity-70">
								{user?.email || "user@example.com"}
							</span>
						</div>
						<Link to="/home">
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 cursor-pointer border-cyan-300 text-cyan-600 hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition-all duration-200 shadow-sm hover:shadow-md"
							>
								<Home className="h-4 w-4" />
							</Button>
						</Link>
					</div>
				</SidebarHeader>

				<SidebarContent className="px-2 py-4">
					<SidebarGroup>
						<SidebarGroupLabel className="text-sidebar-muted-foreground font-medium text-xs uppercase tracking-wider px-3 py-2">
							Navigation
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu className="space-y-1">
								{menuItems.map((item: (typeof menuItems)[number]) => (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton
											onClick={() => handleMenuClick?.(item.id)}
											className={
												activeView === item.id
													? "bg-cyan-600 text-white shadow-sm font-medium border-l-4 border-cyan-300 hover:bg-cyan-700"
													: "hover:bg-cyan-50 hover:text-cyan-900 dark:hover:bg-cyan-950/20 dark:hover:text-cyan-300 transition-all duration-200"
											}
										>
											<span
												className={
													activeView === item.id
														? "text-white"
														: "text-cyan-600"
												}
											>
												{item.icon}
											</span>
											<span className="font-medium">{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>

				<SidebarFooter className="px-2 py-4 border-t border-sidebar-border">
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<div
									onClick={() => logout()}
									className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer transition-all duration-200 font-medium px-3 py-2 rounded-md border border-transparent hover:border-red-200 dark:hover:border-red-800"
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
				<header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-gradient-to-r from-background/60 to-cyan-50/30 dark:to-cyan-950/20 backdrop-blur-sm px-4 shadow-sm">
					<SidebarTrigger className="-ml-1 md:hidden hover:bg-cyan-100 hover:text-cyan-700 transition-colors duration-200" />
					<Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink className="text-muted-foreground font-medium">
									{breadcrumbText} Dashboard
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage className="font-semibold text-foreground">
									{menuItems.find((item) => item.id === activeView)?.title ||
										"Overview"}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>

				<main className="flex-1 overflow-auto bg-background">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default SidebarLayout;
