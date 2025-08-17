import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, Headset, FileText, Phone } from "lucide-react";

const Support = () => {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* Hero Section */}
			<section className="bg-cyan-600 dark:bg-cyan-800 text-white py-20 px-6">
				<div className="max-w-4xl mx-auto text-center">
					<Headset className="w-16 h-16 mx-auto mb-4 text-cyan-200" />
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						How can we help you?
					</h1>
					<p className="text-lg md:text-xl text-cyan-100">
						Our support team is here to assist you with any questions or issues.
					</p>
				</div>
			</section>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-6 py-16">
				<div className="grid md:grid-cols-3 gap-12">
					{/* Left Column - Contact Info & FAQ */}
					<div className="md:col-span-2">
						{/* FAQ Section */}
						<Card className="mb-12 shadow-lg border-gray-200 dark:border-gray-700">
							<CardHeader>
								<CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
									Frequently Asked Questions
								</CardTitle>
								<CardDescription className="text-gray-600 dark:text-gray-400">
									Find answers to common questions about our platform and
									services.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Accordion type="single" collapsible className="w-full">
									<AccordionItem value="item-1">
										<AccordionTrigger className="text-lg font-semibold text-gray-700 dark:text-gray-300">
											How do I list my property?
										</AccordionTrigger>
										<AccordionContent className="text-base text-gray-600 dark:text-gray-400">
											To list your property, you need to create a landlord
											account. Once registered, you can access your dashboard
											and follow the simple steps to add your property details,
											photos, and rental terms.
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="item-2">
										<AccordionTrigger className="text-lg font-semibold text-gray-700 dark:text-gray-300">
											What is the application process for tenants?
										</AccordionTrigger>
										<AccordionContent className="text-base text-gray-600 dark:text-gray-400">
											Tenants can browse listings and apply directly through our
											platform. The application typically includes personal
											information, rental history, and income verification.
											Landlords review applications and will contact you for the
											next steps.
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="item-3">
										<AccordionTrigger className="text-lg font-semibold text-gray-700 dark:text-gray-300">
											How are payments handled?
										</AccordionTrigger>
										<AccordionContent className="text-base text-gray-600 dark:text-gray-400">
											We provide a secure payment gateway for tenants to pay
											rent and deposits. Landlords can track payments through
											their dashboard. We support various payment methods for
											your convenience.
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="item-4">
										<AccordionTrigger className="text-lg font-semibold text-gray-700 dark:text-gray-300">
											Is my personal information secure?
										</AccordionTrigger>
										<AccordionContent className="text-base text-gray-600 dark:text-gray-400">
											Yes, we prioritize the security of your data. We use
											industry-standard encryption and security protocols to
											protect your personal and financial information. Please
											refer to our Privacy Policy for more details.
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</CardContent>
						</Card>

						{/* Contact Form */}
						<Card className="shadow-lg border-gray-200 dark:border-gray-700">
							<CardHeader>
								<CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
									Send us a Message
								</CardTitle>
								<CardDescription className="text-gray-600 dark:text-gray-400">
									Have a specific question? Fill out the form below and we'll
									get back to you as soon as possible.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form className="space-y-6">
									<div className="grid sm:grid-cols-2 gap-6">
										<div className="space-y-2">
											<Label
												htmlFor="name"
												className="text-base font-medium text-gray-700 dark:text-gray-300"
											>
												Full Name
											</Label>
											<Input
												id="name"
												placeholder="John Doe"
												className="text-base"
											/>
										</div>
										<div className="space-y-2">
											<Label
												htmlFor="email"
												className="text-base font-medium text-gray-700 dark:text-gray-300"
											>
												Email Address
											</Label>
											<Input
												id="email"
												type="email"
												placeholder="john.doe@example.com"
												className="text-base"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label
											htmlFor="subject"
											className="text-base font-medium text-gray-700 dark:text-gray-300"
										>
											Subject
										</Label>
										<Input
											id="subject"
											placeholder="e.g., Issue with my listing"
											className="text-base"
										/>
									</div>
									<div className="space-y-2">
										<Label
											htmlFor="message"
											className="text-base font-medium text-gray-700 dark:text-gray-300"
										>
											Your Message
										</Label>
										<Textarea
											id="message"
											placeholder="Please describe your issue in detail..."
											className="min-h-[150px] text-base"
										/>
									</div>
									<Button
										type="submit"
										className="w-full bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white text-base py-3"
									>
										Submit Inquiry
									</Button>
								</form>
							</CardContent>
						</Card>
					</div>

					{/* Right Column - Support Resources */}
					<div className="space-y-8">
						<Card className="shadow-md border-gray-200 dark:border-gray-700">
							<CardHeader className="flex flex-row items-center gap-4">
								<div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
									<Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
								</div>
								<div>
									<CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
										Phone Support
									</CardTitle>
									<CardDescription className="text-gray-600 dark:text-gray-400">
										Speak directly with a support agent.
									</CardDescription>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-lg font-semibold text-gray-800 dark:text-white text-center">
									+1 (800) 123-4567
								</p>
							</CardContent>
						</Card>

						<Card className="shadow-md border-gray-200 dark:border-gray-700">
							<CardHeader className="flex flex-row items-center gap-4">
								<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
									<FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
								</div>
								<div>
									<CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
										Guides & Tutorials
									</CardTitle>
									<CardDescription className="text-gray-600 dark:text-gray-400">
										Explore our knowledge base for helpful articles.
									</CardDescription>
								</div>
							</CardHeader>
							<CardContent>
								<Button
									variant="outline"
									className="w-full text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-400 dark:hover:text-black"
								>
									View Guides
								</Button>
							</CardContent>
						</Card>

						<Card className="shadow-md border-gray-200 dark:border-gray-700">
							<CardHeader className="flex flex-row items-center gap-4">
								<div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
									<ShieldCheck className="w-6 h-6 text-red-600 dark:text-red-400" />
								</div>
								<div>
									<CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
										Trust & Safety
									</CardTitle>
									<CardDescription className="text-gray-600 dark:text-gray-400">
										Learn how we protect our community.
									</CardDescription>
								</div>
							</CardHeader>
							<CardContent>
								<Button
									variant="outline"
									className="w-full text-red-600 border-red-600 hover:bg-red-600 hover:text-white dark:text-red-400 dark:border-red-400 dark:hover:bg-red-400 dark:hover:text-black"
								>
									Learn More
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Support;
