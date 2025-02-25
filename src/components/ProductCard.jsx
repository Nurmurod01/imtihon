"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/lib/slices/wishlistSlice";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

export default function ProductCard({ product, index }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const isInWishlist = wishlist.items.includes(product.id);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product.id));
    }
    const updatedWishlist = isInWishlist
      ? wishlist.items.filter((id) => id !== product.id)
      : [...wishlist.items, product.id];
    localStorage.setItem("likes", JSON.stringify(updatedWishlist));
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-[#F4F5F7]  rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link href={`/shop/${product.id}`}>
        <div className="relative aspect-square">
          <Image
            src={`http://localhost:3004/media/products/${product.imgUrl}`}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={toggleWishlist}
          >
            <Heart
              className={`h-5 w-5 ${
                isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </Button>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg mb-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{product.category.name}</p>
          <div className="flex items-center justify-between">
            <span className="font-semibold">${product.price.toFixed(2)}</span>
            <Button variant="outline" size="sm">
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
