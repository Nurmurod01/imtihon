import { Button } from "@/components/ui/button";
import { products } from "../data";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function ProductsSection() {
  return (
    <section className="py-24">
      <div className="px-4">
        <h2 className="text-5xl font-bold text-center mb-12">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href={"/shop"}>
            <Button
              variant="outline"
              className="px-10 py-6 text-[#B88E2F] border-[#B88E2F] font-semibold hover:text-[#B88E2F]"
            >
              Show More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
