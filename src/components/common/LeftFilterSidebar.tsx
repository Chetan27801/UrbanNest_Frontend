import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

import { PropertyType } from "@/utils/enums";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";
import { BiBuildings } from "react-icons/bi";
import { TbBuildingEstate, TbBuildingCottage } from "react-icons/tb";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { amenities } from "@/utils/Constants";

const LeftFilterSidebar = ({ className }: { className: string }) => {
	return (
		// I've removed the red background color for a cleaner look
		<div className={cn("flex p-4 border-r flex-col gap-2", className)}>
			<div className="flex flex-col gap-4">
				<h1 className="text-md font-bold">Property Type</h1>
				<div className="grid grid-cols-2 gap-2">
					<Button
						variant="outline"
						className="h-auto w-auto flex flex-col gap-2 p-4"
					>
						<FaRegBuilding style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Apartment}</span>
					</Button>
					<Button
						variant="outline"
						className="h-auto w-auto flex flex-col gap-2 p-4"
					>
						<MdOutlineVilla style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Villa}</span>
					</Button>
					<Button variant="outline" className="h-auto flex flex-col gap-2 p-4">
						<BiBuildings style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Townhouse}</span>
					</Button>
					<Button variant="outline" className="h-auto flex flex-col gap-2 p-4">
						<TbBuildingCottage style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Cottage}</span>
					</Button>
					<Button variant="outline" className="h-auto flex flex-col gap-2 p-4">
						<TbBuildingEstate style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Tinyhouse}</span>
					</Button>
					<Button variant="outline" className="h-auto flex flex-col gap-2 p-4">
						<IoHomeOutline style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Rooms}</span>
					</Button>
				</div>
			</div>

			<Separator className="max-w-full my-2 bg-gray-300" />

			<div className="flex flex-col gap-4">
				<h1 className="text-md font-bold">Price Range</h1>
				<div className="flex items-center gap-2">
					<span className="text-md font-bold">Min</span>
					<Input type="number" placeholder="Min Price" />
				</div>
				<div className="flex items-center gap-2">
					<span className="text-md font-bold">Max</span>
					<Input type="number" placeholder="Max Price" />
				</div>
			</div>
			<Separator className="max-w-full my-2 bg-gray-300" />
			<div className="flex flex-col gap-4 text-sm">
				<h1 className="text-md font-bold">Conveniences</h1>
				<div className="flex flex-wrap gap-2">
					{amenities.map((amenity) => (
						<Button
							variant="outline"
							className="h-auto flex flex-row gap-2 p-2"
						>
							<amenity.icon />
							<span className="text-sm">{amenity.label}</span>
						</Button>
					))}
				</div>
			</div>

			<Button variant="default" className="h-auto flex flex-row gap-2 p-2 mt-2">
				<span>Apply</span>
			</Button>
			<Button variant="outline" className="h-auto flex flex-row gap-2 p-2 mt-2">
				<span>Clear All</span>
			</Button>
		</div>
	);
};

export default LeftFilterSidebar;
