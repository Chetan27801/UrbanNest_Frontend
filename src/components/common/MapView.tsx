import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { DivIcon, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for a known issue with default marker icons in webpack
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (Icon.Default.prototype as any)._getIconUrl;

Icon.Default.mergeOptions({
	iconRetinaUrl: markerIcon2x,
	iconUrl: markerIcon,
	shadowUrl: markerShadow,
});

const MapView = ({
	className,
	isFilter,
}: {
	className: string;
	isFilter: boolean;
}) => {
	// Set the initial position of the map
	const position: LatLngExpression = [22.5726, 88.3639]; // Kolkata, India

	const simplePropertyIcon = new DivIcon({
		className: "simple-property-marker",
		html: `
			<div class="relative transform hover:scale-105 transition-all duration-200">
				<div class="bg-gray-900 bg-opacity-95 backdrop-blur-sm rounded shadow-lg px-2 py-1.5 text-white min-w-max">
					<div class="flex items-center space-x-1.5">
						<!-- Small property image -->
						<div class="w-6 h-6 bg-cover bg-center rounded flex-shrink-0" style="background-image: url('https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=24&h=24&fit=crop&crop=center');"></div>
						<div class="text-left">
							<div class="font-semibold text-xs">Cangu Villa</div>
							<div class="text-xs text-gray-300">$200 night</div>
						</div>
					</div>
				</div>
				<div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0" style="border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid rgba(17, 24, 39, 0.95);"></div>
			</div>
		`,
		iconSize: [120, 35],
		iconAnchor: [60, 35],
		popupAnchor: [0, -35],
	});

	const selectedIcon = simplePropertyIcon;

	return (
		<div
			className={cn(
				"relative w-full h-full z-0",
				isFilter ? "w-2/3" : "w-full rounded-lg px-4 py-2",
				className
			)}
		>
			{/* Add custom CSS for the markers */}
			<style>{`
				.property-card-marker {
					background: transparent !important;
					border: none !important;
				}
				.simple-property-marker {
					background: transparent !important;
					border: none !important;
				}
				.price-only-marker {
					background: transparent !important;
					border: none !important;
				}
			`}</style>

			<MapContainer
				center={position}
				zoom={13}
				scrollWheelZoom={false}
				className="h-full w-full"
			>
				{/* TileLayer provides the map images from OpenStreetMap */}
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{/* Custom styled marker */}
				<Marker position={position} icon={selectedIcon}>
					<Popup className="custom-popup">
						<Link
							to={`/property/${1}`}
							className="text-blue-500 hover:text-cyan-600"
						>
							View Details
						</Link>
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default MapView;
