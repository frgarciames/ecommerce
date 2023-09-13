import { Button } from "../shadcn/ui/button";
import { addProductToCart } from "@/lib/services.client";

export const ProductAddToCart = ({
  id,
  ...props
}: React.ComponentProps<typeof Button> & {
  id: string;
}) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    addProductToCart(id);
  };
  return <Button {...props} onClick={handleClick} />;
};