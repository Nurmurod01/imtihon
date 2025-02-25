"use client";
import ErrProduct from "@/components/ErrProduct";
import { Loading } from "@/components/Loading";
import ProductsSection from "@/components/Product";
import ProductDetails from "@/components/ProductDetails";
import { useGetOneProductQuery } from "@/lib/service/api";
import { useParams } from "next/navigation";
import React from "react";

export default function SingleProduct() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetOneProductQuery(id);

  if (isLoading) return <Loading />;
  if (error) return <ErrProduct />;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <ProductDetails product={product} />
      <ProductsSection />
    </div>
  );
}
