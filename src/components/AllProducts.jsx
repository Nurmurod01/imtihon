"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InnerPlace } from "@/images";

const products = [
  {
    id: 1,
    name: "Syltherine",
    category: "Stylish cafe chair",
    image: InnerPlace,
    price: 2500000,
    oldPrice: 3500000,
    discount: 30,
  },
  {
    id: 2,
    name: "Leviosa",
    category: "Stylish cafe chair",
    image: InnerPlace,
    price: 2500000,
  },
  {
    id: 3,
    name: "Lolito",
    category: "Luxury big sofa",
    image: InnerPlace,
    price: 7000000,
    oldPrice: 14000000,
    discount: 50,
  },
  {
    id: 4,
    name: "Respira",
    category: "Outdoor bar table and stool",
    image: InnerPlace,
    price: 500000,
    isNew: true,
  },
  
];

export default function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [liked, setLiked] = useState([]);
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const toggleLike = (productId) => {
    setLiked((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-square">
              <Image
                src={product.image || InnerPlace}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.discount && (
                <Badge className="absolute left-4 top-4 bg-red-500">
                  -{product.discount}%
                </Badge>
              )}
              {product.isNew && (
                <Badge className="absolute left-4 top-4 bg-emerald-500">
                  New
                </Badge>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                  onClick={() => console.log("Add to cart:", product.name)}
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                  onClick={() => console.log("Share:", product.name)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className={`rounded-full ${
                    liked.includes(product.id) ? "text-red-500" : ""
                  }`}
                  onClick={() => toggleLike(product.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      liked.includes(product.id) ? "fill-current" : ""
                    }`}
                  />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-1">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.category}</p>
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-8">
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? "default" : "outline"}
            className={`w-10 h-10 ${
              currentPage === i + 1 ? "bg-[#B88E2F]" : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        {currentPage < totalPages && (
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
