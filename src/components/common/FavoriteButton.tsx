import { Heart } from "lucide-react";
import { Button } from "../ui/button";

interface FavoriteButtonProps {
	propertyId: string;
	className?: string;
}

const FavoriteButton = ({ propertyId, className }: FavoriteButtonProps) => {
	return (
		<Button variant="outline" className={className} onClick={() => {}}>
			<Heart className="size-4" />
			<span>Add to Favorites</span>
			{propertyId}
		</Button>
	);
};

export default FavoriteButton;
