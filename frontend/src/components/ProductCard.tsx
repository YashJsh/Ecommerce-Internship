import { formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import type { ProductProps } from "@/api/product";


export function ProductCard({ product }: { product: ProductProps }) {
  // Proper currency formatting for Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", { // Changed to en-IN
      style: "currency",
      currency: "INR", // Correct currency code
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.imageUrl || "https://placehold.co/600x600/e2e8f0/64748b?text=Product+Image"}
          alt={product.name}
          className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/600x600/e2e8f0/64748b?text=Product+Image";
          }}
        />
      </div>

      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold mb-2 text-lg capitalize">{product.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-2">
          {product.description}
        </p>
        <p className="font-medium text-lg">
          {formatPrice(product.price)} {/* Added price formatting */}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Added {formatDistanceToNow(new Date(product.createdAt), { 
            addSuffix: true 
          })}
        </p>
      </CardContent>
    </Card>
  );
}