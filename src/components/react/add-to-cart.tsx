import { Button } from "../shadcn/ui/button";
import { store } from "@/lib/store";

export const ProductAddToCart = ({
  id,
  ...props
}: React.ComponentProps<typeof Button> & {
  id: string;
}) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    store.addProductToCart(id);
  };
  return (
    <Button
      size="lg"
      className="w-full shadow-md md:w-auto"
      onClick={handleClick}
      {...props}
    />
  );
};
