"use client";
import ProductsSection from "@/components/Product";
import ProductDetails from "@/components/ProductDetails";
import { useGetOneProductQuery } from "@/lib/service/api";
import { useParams } from "next/navigation";
import React from "react";

export default function SingleProduct() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetOneProductQuery(id);
  console.log(error, product, isLoading);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <ProductDetails product={product} />
      <ProductsSection />
    </div>
  );
}
