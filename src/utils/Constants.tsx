import {
	Building2Icon,
	BuildingIcon,
	CreditCardIcon,
	DollarSignIcon,
	HomeIcon,
	EyeIcon,
	HeartIcon,
	Monitor,
	PawPrintIcon,
	SettingsIcon,
	TreesIcon,
	TvIcon,
	UsersIcon,
	CarIcon,
	PlusIcon,
} from "lucide-react";

import { FaSwimmingPool } from "react-icons/fa";
import { MdOutlineMicrowave, MdOutlinePets } from "react-icons/md";
import { BiCloset, BiSolidWasher } from "react-icons/bi";
import { TbAirConditioning, TbWashEco, TbFridge } from "react-icons/tb";
import { CiWifiOn } from "react-icons/ci";
import { LucideCircleParking } from "lucide-react";
import { CgGym } from "react-icons/cg";
import { GiWoodenPier } from "react-icons/gi";
import { IoCellular } from "react-icons/io5";

//Admin
import AdminUser from "@/components/dashboard/Admin/AdminUser";
import AdminProperties from "@/components/dashboard/Admin/AdminProperties";
import AdminSetting from "@/components/dashboard/Admin/AdminSetting";

//Tenant
import TenantFavorites from "@/components/dashboard/Tenant/TenantFavorites";
import TenantApplications from "@/components/dashboard/Tenant/TenantApplications";
import TenantResidence from "@/components/dashboard/Tenant/TenantResidence";
import TenantBillingHistory from "@/components/dashboard/Tenant/TenantBillingHistory";
import TenantPayment from "@/components/dashboard/Tenant/TenantPayment";
import TenantSetting from "@/components/dashboard/Tenant/TenantSetting";

//Landlord
import LandlordApplications from "@/components/dashboard/Landlord/LandlordApplications";
import LandlordTenants from "@/components/dashboard/Landlord/LandlordTenants";
// import LandlordBillingHistory from "@/components/dashboard/Landlord/LandlordBillingHistory";
import LandlordSetting from "@/components/dashboard/Landlord/LandlordSetting";
import LandlordProperties from "@/components/dashboard/Landlord/LandlordProperties";
import LandlordCreateProperty from "@/components/dashboard/Landlord/LandlordCreateProperty";

const ADMIN_DASHBOARD_LIST = [
	{
		id: "1",
		title: "Users",
		icon: <UsersIcon />,
		component: <AdminUser />,
		url: "/admin/users",
	},
	{
		id: "2",
		title: "Properties",
		icon: <HomeIcon />,
		component: <AdminProperties />,
		url: "/admin/properties",
	},
	{
		id: "3",
		title: "Settings",
		icon: <SettingsIcon />,
		component: <AdminSetting />,
		url: "/admin/settings",
	},
];

const TENANT_DASHBOARD_LIST = [
	{
		id: "1",
		title: "Favorites",
		icon: <HeartIcon />,
		component: <TenantFavorites />,
		url: "/tenant/favorites",
	},
	{
		id: "2",
		title: "Applications",
		icon: <Monitor />,
		component: <TenantApplications />,
		url: "/tenant/applications",
	},
	{
		id: "3",
		title: "Residence",
		icon: <HomeIcon />,
		component: <TenantResidence />,
		url: "/tenant/residence",
	},
	{
		id: "4",
		title: "Billing History",
		icon: <DollarSignIcon />,
		component: <TenantBillingHistory />,
		url: "/tenant/billing-history",
	},
	{
		id: "5",
		title: "Payment Methods",
		icon: <CreditCardIcon />,
		component: <TenantPayment />,
		url: "/tenant/payment-methods",
	},
	{
		id: "6",
		title: "Settings",
		icon: <SettingsIcon />,
		component: <TenantSetting />,
		url: "/tenant/settings",
	},
];

const LANDLORD_DASHBOARD_LIST = [
	{
		id: "1",
		title: "Properties",
		icon: <HomeIcon />,
		component: <LandlordProperties />,
		url: "/landlord/properties",
	},
	{
		id: "2",
		title: "Applications",
		icon: <Monitor />,
		component: <LandlordApplications />,
		url: "/landlord/applications",
	},
	{
		id: "3",
		title: "Tenants",
		icon: <UsersIcon />,
		component: <LandlordTenants />,
		url: "/landlord/tenants",
	},
	{
		id: "4",
		title: "Create Property",
		icon: <PlusIcon />,
		component: <LandlordCreateProperty />,
		url: "/landlord/create-property",
	},
	{
		id: "5",
		title: "Settings",
		icon: <SettingsIcon />,
		component: <LandlordSetting />,
		url: "/landlord/settings",
	},
];

const propertyTypes = [
	{ id: "rooms", label: "Rooms", icon: HomeIcon },
	{ id: "apartment", label: "Apartment", icon: BuildingIcon },
	{ id: "tinyhouse", label: "Tinyhouse", icon: HomeIcon },
	{ id: "townhouse", label: "Townhouse", icon: Building2Icon },
	{ id: "villa", label: "Villa", icon: HomeIcon },
	{ id: "cottage", label: "Cottage", icon: HomeIcon },
];

const conveniences = [
	{ id: "tv", label: "TV", icon: TvIcon },
	{ id: "disabled", label: "Disabled Access", icon: CarIcon },
	{ id: "woods", label: "In the woods", icon: TreesIcon },
	{ id: "views", label: "Views", icon: EyeIcon },
	{ id: "hottubs", label: "Hot Tubs", icon: HomeIcon },
	{ id: "lake", label: "Lake & Rivers", icon: HomeIcon },
	{ id: "petfriendly", label: "Pet Friendly", icon: PawPrintIcon },
	{ id: "wifi", label: "Wifi", icon: CiWifiOn },
];

const amenities = [
	{ id: "wifi", label: "Wifi", icon: CiWifiOn },
	{ id: "internet", label: "Internet", icon: IoCellular },
	{ id: "airconditioning", label: "Air Conditioning", icon: TbAirConditioning },
	{ id: "gym", label: "Gym", icon: CgGym },
	{ id: "hardwoodfloors", label: "Hardwood Floors", icon: GiWoodenPier },
	{ id: "pool", label: "Pool", icon: FaSwimmingPool },
	{ id: "parking", label: "Parking", icon: LucideCircleParking },
	{ id: "microwave", label: "Microwave", icon: MdOutlineMicrowave },
	{ id: "dishwasher", label: "Dishwasher", icon: TbWashEco },
	{ id: "refrigerator", label: "Refrigerator", icon: TbFridge },
	{ id: "petsallowed", label: "Pets Allowed", icon: MdOutlinePets },
	{ id: "washerdryer", label: "Washer & Dryer", icon: BiSolidWasher },
	{ id: "walkinclosets", label: "Walk-in Closets", icon: BiCloset },
];

export {
	ADMIN_DASHBOARD_LIST,
	TENANT_DASHBOARD_LIST,
	LANDLORD_DASHBOARD_LIST,
	propertyTypes,
	conveniences,
	amenities,
};
