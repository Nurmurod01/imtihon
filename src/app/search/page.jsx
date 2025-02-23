"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetProductsQuery } from "@/lib/service/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";

const ITEMS_PER_PAGE = 12;

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [page, setPage] = useState(1);
  const { toast } = useToast();

  const { data: allProducts, isLoading, error } = useGetProductsQuery();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const filteredProducts = useMemo(() => {
    if (!allProducts) return [];
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allProducts, searchTerm]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    setPage(1);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#B88E2F]">
        Search Products
      </h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button
            type="submit"
            className="bg-[#B88E2F] hover:bg-[#aa842b] text-white"
          >
            Search
          </Button>
        </div>
      </form>

      {isLoading && (
        <p className="text-center text-[#B88E2F]">Loading products...</p>
      )}

      {paginatedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative h-48 sm:h-56">
                  <Image
                    src={`http://localhost:3004/media/products/${product.imgUrl}`}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </p>
                  <p className="text-[#B88E2F] font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`/product/${product.id}`} passHref>
                    <Button className="w-full bg-[#B88E2F] hover:bg-[#aa842b] text-white">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          {page * ITEMS_PER_PAGE < filteredProducts.length && (
            <div className="mt-8 text-center">
              <Button
                onClick={loadMore}
                className="bg-[#B88E2F] hover:bg-[#aa842b] text-white"
              >
                Load More
              </Button>
            </div>
          )}
        </>
      ) : (
        searchTerm &&
        !isLoading && (
          <p className="text-center text-gray-600">
            No products found. Try a different search term.
          </p>
        )
      )}
    </div>
  );
}
