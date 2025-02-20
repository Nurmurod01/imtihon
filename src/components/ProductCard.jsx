import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block bg-[#F4F5F7] ">
      <div className="relative aspect-square overflow-hidden ">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {product.isNew && (
          <Badge className="absolute right-2 top-2 px-2 py-3 rounded-full bg-green-500">New</Badge>
        )}
      </div>
      <div className="mt-4 space-y-2 px-5 pb-2">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            Rp {product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              Rp {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
