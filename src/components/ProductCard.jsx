"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import { useLikes } from "@/hooks/useLikes";
import { useAddCartItemMutation } from "@/lib/service/api";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth"; 

export default function ProductCard({ product, index }) {
  const { liked, toggleLike } = useLikes();
  const userId = localStorage.getItem("userId"); 
  const [addCartItem, { isLoading }] = useAddCartItemMutation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Please login to add to cart");
      return;
    }

    try {
      await addCartItem({
        userId,
        productId: product.id,
        quantity: 1,
      }).unwrap();

      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      toast.error("There was an error adding to cart!");
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-[#F4F5F7] rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative w-full h-64 sm:h-72 md:h-80">
        <Image
          src={`http://localhost:3004/media/products/${product.imgUrl}`}
          alt={product.name}
          fill
          className="object-cover"
        />

        {product.isNew && (
          <Badge className="absolute left-2 sm:left-4 top-2 sm:top-4 bg-emerald-500 text-xs sm:text-sm">
            New
          </Badge>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 sm:gap-4">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full p-2 sm:p-3"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full p-2 sm:p-3"
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title: product.name,
                    text: `Bu mahsulotni ko'ring: ${product.name}`,
                    url: window.location.href,
                  })
                  .then(() => console.log("Shared successfully"))
                  .catch((error) => console.error("Error sharing:", error));
              } else {
                console.log("Web Share API qo‘llab-quvvatlanmaydi.");
              }
            }}
          >
            <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className={`rounded-full p-2 sm:p-3 ${
              liked.includes(product.id) ? "text-red-500" : ""
            }`}
            onClick={() => toggleLike(product.id)}
          >
            <Heart
              className={`h-4 w-4 sm:h-5 sm:w-5 ${
                liked.includes(product.id) ? "fill-current" : ""
              }`}
            />
          </Button>
        </div>
      </div>
      <Link href={`/shop/${product.id}`}>
        <div className="p-3 sm:p-4">
          <h3 className="font-medium text-base sm:text-lg mb-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-2">
            {product.category.name}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm sm:text-base">
              {product.price} $
            </span>
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-xs sm:text-sm">
                {product.oldPrice} $
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
