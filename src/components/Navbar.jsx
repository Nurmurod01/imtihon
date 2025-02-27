"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  LogIn,
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  Heart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/images";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/lib/slices/authSlice";
import { setWishlist } from "@/lib/slices/wishlistSlice";

export default function Navbar() {
  const auth = useSelector((state) => state.auth);
  const wishlist = useSelector((state) => state.wishlist);
  const isAuthenticated = auth?.isAuthenticated || false;
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("likes");
    if (storedWishlist) {
      dispatch(setWishlist(JSON.parse(storedWishlist)));
    }
  }, [dispatch]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="relative mx-auto container">
      <div className="mx-4  sm:mx-10 flex h-16 sm:h-24 items-center justify-between px-2 sm:px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={Logo || "/placeholder.svg"}
            width={120}
            height={26}
            alt="logo"
            className="w-24 sm:w-32 md:w-40"
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-24 text-base lg:text-lg">
          <Link
            href="/"
            className="font-medium hover:text-gray-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="font-medium hover:text-gray-600 transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="font-medium hover:text-gray-600 transition-colors"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center space-x-4 sm:space-x-7">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/search")}
            className="hidden sm:inline-flex"
          >
            <Search className="w-10 h-10 sm:w-6 sm:h-6" />
          </Button>
          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex"
                onClick={() => router.push("/profile")}
              >
                <User className="w-10 h-10 sm:w-6 sm:h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/wishlist")}
                className="hidden relative sm:inline-flex"
              >
                <Heart className="w-10 h-10 sm:w-6 sm:h-6" />
                {wishlist.items.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {wishlist.items.length}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/cart")}
                className="hidden sm:inline-flex"
              >
                <ShoppingCart className="w-10 h-10 sm:w-6 sm:h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="hidden sm:inline-flex"
              >
                <LogOut className="w-10 h-10 sm:w-6 sm:h-6" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/auth/login")}
              className="hidden sm:inline-flex"
            >
              <LogIn className="w-10 h-10 sm:w-6 sm:h-6" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="md:hidden"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white z-50 shadow-md">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link href="/" className="font-medium" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/shop" className="font-medium" onClick={toggleMenu}>
              Shop
            </Link>
            {isAuthenticated && (
              <Link href="/order" className="font-medium" onClick={toggleMenu}>
                My Orders
              </Link>
            )}
            <Link href="/about" className="font-medium" onClick={toggleMenu}>
              About
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                router.push("/search");
                toggleMenu();
              }}
            >
              <Search className="w-10 h-10" />
            </Button>
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push("/profile")}
                >
                  <User className="w-10 h-10" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    router.push("/wishlist");
                    toggleMenu();
                  }}
                >
                  <Heart className="w-10 h-10" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    router.push("/cart");
                    toggleMenu();
                  }}
                >
                  <ShoppingCart className="w-10 h-10" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  <LogOut className="w-10 h-10" />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  router.push("/auth/login");
                  toggleMenu();
                }}
              >
                <LogIn className="w-10 h-10" />
              </Button>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
