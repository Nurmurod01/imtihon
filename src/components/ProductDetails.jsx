"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, Plus, Minus, Facebook, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";
import {
  useAddCartItemMutation,
  useGetOneCategoryQuery,
} from "@/lib/service/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function ProductDetails({ product }) {
  const [count, setCount] = useState(1);
  const data = useSelector((state) => state.auth);
  const isAuthenticated = data?.isAuthenticated || false;
  const userId = data?.user.id || false;
  // const [activeSize, setActiveSize] = useState("L");
  // const [activeColor, setActiveColor] = useState("bg-purple-500");
  const { data: category } = useGetOneCategoryQuery(product.categoryId);
  const [addCartItem, { isLoading }] = useAddCartItemMutation();

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 1 ? count - 1 : 1);
  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setCount(value);
    }
  };

  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("You must be logged in to add items to the cart.");
      return;
    }

    try {
      await addCartItem({
        userId,
        productId: product.id,
        quantity: count,
      }).unwrap();

      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("There was an error adding to cart!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="relative w-full h-72 sm:h-96 md:h-[450px] bg-[#F9F1E7]">
          <Image
            src={`http://localhost:3004/media/products/${product.imgUrl}`}
            alt={product.name}
            fill
            className="object-contain p-6 sm:p-8 rounded-lg"
          />
        </div>

        <div className="space-y-4 sm:space-y-6 py-3 sm:py-5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium">
            {product.name}
          </h1>
          <div className="text-xl sm:text-2xl text-gray-500">
            {product.price} $
          </div>
          {product.isNew && (
            <span className="text-xs sm:text-sm text-green-600 font-semibold pt-1 sm:pt-2">
              New Arrival
            </span>
          )}
          <p className="text-sm sm:text-base text-gray-600">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center border rounded">
              <button
                className="p-2 sm:p-3 hover:bg-gray-100"
                onClick={decrement}
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                className="w-12 sm:w-16 border-x text-center text-sm sm:text-base"
                value={count}
                onChange={handleChange}
              />
              <button
                className="p-2 sm:p-3 hover:bg-gray-100"
                onClick={increment}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={isLoading || !isAuthenticated}
              className="w-full sm:w-auto flex-1 bg-white text-black border text-base sm:text-lg py-3 sm:py-5 hover:bg-gray-100 rounded-lg sm:rounded-xl"
            >
              {isLoading
                ? "Adding..."
                : isAuthenticated
                ? "Add To Cart"
                : "Login to Buy"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
