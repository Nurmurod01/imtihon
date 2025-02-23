import BrowseRange from "@/components/Browse";
import Explore from "@/components/Explore";
import HeroSection from "@/components/Header";
import ProductsSection from "@/components/Product";
import ProductCard from "@/components/ProductCard";
import React from "react";

export default function page() {
  return (
    <div className="">
      <HeroSection />
      <BrowseRange />
      <ProductsSection variant="home" />
      <Explore />
    </div>
  );
}
