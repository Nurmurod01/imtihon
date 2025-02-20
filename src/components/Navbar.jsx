import React from "react";
import { Button } from "./ui/button";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/images";

export default function Navbar() {
  return (
    <div className="mx-10 flex h-24 items-center justify-between px-4">
      <Link href="/" className="flex items-center space-x-2">
        <Image src={Logo} width={185} height={41} alt="logo" />
      </Link>
      <nav className="flex items-center space-x-24 text-lg">
        <Link href="/" className="font-medium">
          Home
        </Link>
        <Link href="/shop" className="font-medium">
          Shop
        </Link>
        <Link href="/about" className="font-medium">
          About
        </Link>
        <Link href="/contact" className="font-medium">
          Contact
        </Link>
      </nav>
      <div className="flex items-center space-x-7">
        <Button variant="ghost" size="icon">
          <User style={{ width: "22px", height: "22px" }} />
        </Button>
        <Button variant="ghost" size="icon">
          <Search style={{ width: "22px", height: "22px" }} />
        </Button>
        <Button variant="ghost" size="icon">
          <Heart style={{ width: "22px", height: "22px" }} />
        </Button>
        <Button variant="ghost" size="icon">
          <ShoppingCart style={{ width: "22px", height: "22px" }} />
        </Button>
      </div>
    </div>
  );
}
