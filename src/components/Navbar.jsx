"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  LogIn,
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/images";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth"; 

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth(); 
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative">
      <div className="mx-4 sm:mx-10 flex h-16 sm:h-24 items-center justify-between px-2 sm:px-4">
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
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          {isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/profile")}
                className="hidden sm:inline-flex"
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/cart")}
                className="hidden sm:inline-flex"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout} 
                className="hidden sm:inline-flex"
              >
                <LogOut className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/auth/login")}
              className="hidden sm:inline-flex"
            >
              <LogIn className="w-5 h-5 sm:w-6 sm:h-6" />
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
            <Link href="/about" className="font-medium" onClick={toggleMenu}>
              About
            </Link>
            <div className="grid grid-cols-2 gap-5">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  router.push("/search");
                  toggleMenu();
                }}
              >
                <Search className="w-5 h-5" />
              </Button>
              {isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      router.push("/profile");
                      toggleMenu();
                    }}
                  >
                    <User className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      router.push("/cart");
                      toggleMenu();
                    }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      logout(); 
                      toggleMenu();
                    }}
                  >
                    <LogOut className="w-5 h-5" />
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
                  <LogIn className="w-5 h-5" />
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
