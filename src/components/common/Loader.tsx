const Loader = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[200px] p-8">
			{/* Bouncing House Icon */}
			<div className="animate-bounce">
				<svg
					className="w-16 h-16 text-cyan-500"
					fill="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
				</svg>
			</div>

			{/* Loading text */}
			<div className="text-center mt-6">
				<p className="text-cyan-700 font-semibold text-lg animate-pulse">
					Finding your perfect home...
				</p>
				<div className="flex justify-center mt-3 space-x-1">
					<div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
					<div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:150ms]"></div>
					<div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:300ms]"></div>
				</div>
			</div>
		</div>
	);
};

export default Loader;
