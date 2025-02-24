"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { useGetProductsQuery } from "@/lib/service/api";
import { Loading } from "./Loading";

export default function ProductsSection({ variant }) {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const latestProducts = products?.slice(variant === "home" ? -8 : -4) || [];

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading products</p>;

  return (
    <section className="py-16 sm:py-24" id="products">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-5xl font-bold text-center mb-8 sm:mb-12">
          {variant === "home" ? "Our Products" : "Related Products"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {latestProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        <div className="text-center mt-6 sm:mt-8">
          <Link href={"/shop"}>
            <Button
              variant="outline"
              className="px-6 sm:px-10 py-4 sm:py-6 text-[#B88E2F] border-[#B88E2F] font-semibold hover:text-[#B88E2F]"
            >
              Show More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
