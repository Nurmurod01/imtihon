"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "@/lib/service/api";

export default function AllProducts() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <div className="text-center py-10">No products found.</div>;
  }

  const productsPerPage = 12;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {currentProducts.map((product, index) => (
          <ProductCard product={product} key={product.id} index={index} />
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
        {currentPage > 1 && (
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="w-16 h-10 text-sm"
          >
            Prev
          </Button>
        )}

        <div className="flex flex-wrap justify-center items-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm ${
                currentPage === i + 1 ? "bg-[#B88E2F]" : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>

        {currentPage < totalPages && (
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="w-16 h-10 text-sm"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
