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

interface NormalLoaderProps {
	size?: "sm" | "md" | "lg" | "xl";
}

const NormalLoader = ({ size = "md" }: NormalLoaderProps) => {
	// Size configurations
	const sizeConfig = {
		sm: {
			container: "w-8 h-8",
			outerRing: "w-8 h-8 border-[1.5px]",
			middleRing: "w-5 h-5 border-[1.5px]",
			core: "w-2 h-2",
			backdrop: "w-10 h-10",
			orbitRing: "w-6 h-6",
			dots: "w-0.5 h-0.5",
		},
		md: {
			container: "w-12 h-12",
			outerRing: "w-12 h-12 border-2",
			middleRing: "w-8 h-8 border-2",
			core: "w-3 h-3",
			backdrop: "w-16 h-16",
			orbitRing: "w-10 h-10",
			dots: "w-1 h-1",
		},
		lg: {
			container: "w-16 h-16",
			outerRing: "w-16 h-16 border-2",
			middleRing: "w-11 h-11 border-2",
			core: "w-4 h-4",
			backdrop: "w-20 h-20",
			orbitRing: "w-14 h-14",
			dots: "w-1.5 h-1.5",
		},
		xl: {
			container: "w-20 h-20",
			outerRing: "w-20 h-20 border-3",
			middleRing: "w-14 h-14 border-3",
			core: "w-5 h-5",
			backdrop: "w-24 h-24",
			orbitRing: "w-16 h-16",
			dots: "w-2 h-2",
		},
	};

	const config = sizeConfig[size];

	return (
		<div className="flex justify-center items-center h-full relative">
			{/* Outer rotating ring */}
			<div
				className={`absolute ${config.outerRing} border-transparent border-t-cyan-500/30 border-r-cyan-400/20 rounded-full animate-spin`}
			></div>

			{/* Middle rotating ring - opposite direction */}
			<div
				className={`absolute ${config.middleRing} border-transparent border-t-cyan-400 border-l-cyan-500/40 rounded-full animate-spin [animation-direction:reverse] [animation-duration:1.5s]`}
			></div>

			{/* Inner pulsing core */}
			<div
				className={`${config.core} bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full animate-pulse shadow-lg shadow-cyan-500/50`}
			></div>

			{/* Glowing backdrop */}
			<div
				className={`absolute ${config.backdrop} bg-cyan-500/5 rounded-full animate-ping [animation-duration:2s]`}
			></div>

			{/* Orbiting dots */}
			<div
				className={`absolute ${config.orbitRing} animate-spin [animation-duration:3s]`}
			>
				<div
					className={`absolute top-0 left-1/2 ${config.dots} bg-cyan-400 rounded-full transform -translate-x-1/2 shadow-sm shadow-cyan-400/50`}
				></div>
				<div
					className={`absolute bottom-0 left-1/2 ${config.dots} bg-cyan-500 rounded-full transform -translate-x-1/2 shadow-sm shadow-cyan-500/50`}
				></div>
			</div>
		</div>
	);
};

export { NormalLoader, Loader };
