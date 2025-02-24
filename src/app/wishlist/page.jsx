"use client";

import { useSelector, useDispatch } from "react-redux";
import { useGetProductsQuery } from "@/lib/service/api";
import { removeFromWishlist } from "@/lib/slices/wishlistSlice";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/Loading";

export default function WishlistPage() {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const { data: products, isLoading } = useGetProductsQuery();

  const wishlistProducts =
    products?.filter((product) => wishlist.items.includes(product.id)) || [];

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    localStorage.setItem(
      "likes",
      JSON.stringify(wishlist.items.filter((id) => id !== productId))
    );
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My Wishlist</h1>
      {wishlistProducts.length === 0 ? (
        <p className="text-center pt-32 text-2xl text-gray-300">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <Button
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white"
                onClick={() => handleRemoveFromWishlist(product.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
