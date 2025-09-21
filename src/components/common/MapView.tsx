import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { DivIcon, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import type { Property } from "@/types/property";
import { useEffect } from "react";

// Fix for default marker icons
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
	iconRetinaUrl: markerIcon2x,
	iconUrl: markerIcon,
	shadowUrl: markerShadow,
});

const createPropertyIcon = (property: Property) => {
	// ... (This helper function remains the same as the previous correct version)
	return new DivIcon({
		className: "simple-property-marker",
		html: `
            <div class="relative transform hover:scale-105 transition-all duration-200">
                <div class="bg-gray-900 bg-opacity-95 backdrop-blur-sm rounded shadow-lg px-2 py-1.5 text-white min-w-max">
                    <div class="flex items-center space-x-1.5">
                        <div class="w-6 h-6 bg-cover bg-center rounded flex-shrink-0" style="background-image: url('${
													property.photoUrls[0] || ""
												}');"></div>
                        <div class="text-left">
                            <div class="font-semibold text-xs">${
															property.name
														}</div>
                            <div class="text-xs text-gray-300">₹${
															property.pricePerMonth
														}</div>
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
};

const MapUpdater = ({ properties }: { properties: Property[] }) => {
	const map = useMap();
	useEffect(() => {
		if (properties && properties.length > 0) {
			const bounds = properties.map(
				(p) =>
					[
						p.location.coordinates.coordinates[1] as number, // latitude
						p.location.coordinates.coordinates[0] as number, // longitude
					] as [number, number]
			);
			map.fitBounds(bounds, { padding: [50, 50] }); // Add padding
		}
	}, [map, properties]);
	return null;
};

const MapView = ({
	className,
	isFilter,
	properties,
}: {
	className: string;
	isFilter: boolean;
	properties: Property[];
}) => {
	const defaultCenter: LatLngExpression = [28.679079, 77.209006];

	const validProperties =
		properties?.filter(
			(p) =>
				p.location?.coordinates?.coordinates[0] != null &&
				p.location?.coordinates?.coordinates[1] != null &&
				p.location?.coordinates?.coordinates[0] != undefined &&
				p.location?.coordinates?.coordinates[1] != undefined
		) || [];

	return (
		<div
			className={cn(
				"relative w-full h-full z-0",
				isFilter ? "w-2/3" : "w-full rounded-lg px-4 py-2",
				className
			)}
		>
			<style>{`
                .simple-property-marker { background: transparent !important; border: none !important; }
            `}</style>
			<MapContainer
				center={defaultCenter}
				zoom={13}
				scrollWheelZoom={true}
				className="h-full w-full"
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{validProperties.map((property) => (
					<Marker
						key={property._id} // Add the required key prop
						position={[
							property.location.coordinates.coordinates[1] as number, // latitude
							property.location.coordinates.coordinates[0] as number, // longitude
						]}
						icon={createPropertyIcon(property)}
					>
						<Popup className="custom-popup">
							<Link
								to={`/property/${property._id}`}
								className="text-blue-500 hover:text-cyan-600"
							>
								View Details
							</Link>
						</Popup>
					</Marker>
				))}
				<MapUpdater properties={validProperties} />
			</MapContainer>
		</div>
	);
};

export default MapView;
