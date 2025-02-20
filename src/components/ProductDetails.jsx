"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, Plus, Minus, Facebook, Linkedin, Twitter } from "lucide-react";
import { Detail } from "@/images";
import { useState } from "react";

export default function ProductDetails() {
  const [count, setCount] = useState(1);
  const [activeSize, setActiveSize] = useState("L");

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 1 ? count - 1 : 1);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setCount(value);
    }
  };
  const [activeColor, setActiveColor] = useState("bg-purple-500");

  const colors = [
    { bg: "bg-purple-500", ring: "ring-purple-500" },
    { bg: "bg-black", ring: "ring-black" },
    { bg: "bg-[#B88E2F]", ring: "ring-[#B88E2F]" },
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square bg-[#F9F1E7]">
          <Image
            src={Detail}
            alt="Asgaard sofa"
            fill
            className="object-contain p-8"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-medium">Asgaard sofa</h1>

          <div className="text-2xl text-gray-500">Rs. 250,000.00</div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <Star
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                strokeWidth={0.5}
              />
            </div>
            <span className="text-gray-500">5 Customer Review</span>
          </div>

          <p className="text-gray-600">
            Setting the bar as one of the loudest speakers in its class, the
            Kilburn is a compact, stout-hearted hero with a well-balanced audio
            which boasts a clear midrange and extended highs for a sound.
          </p>

          <div className="space-y-2">
            <div className="text-gray-600">Size</div>
            <div className="flex gap-4">
              {["L", "XL", "XS"].map((size) => (
                <button
                  key={size}
                  onClick={() => setActiveSize(size)}
                  className={`h-10 w-12 rounded border transition-colors ${
                    activeSize === size
                      ? "border-[#B88E2F] bg-[#B88E2F] text-white"
                      : "border-gray-300 hover:border-[#B88E2F]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-gray-600">Color</div>
            <div className="flex gap-4">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setActiveColor(color.bg)}
                  className={`h-8 w-8 rounded-full transition-all ${
                    activeColor === color.bg
                      ? `ring-2 ring-offset-2 ${color.ring}`
                      : ""
                  } ${color.bg}`}
                ></button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded">
              <button className="p-3 hover:bg-gray-100">
                <Minus className="w-4 h-4" onClick={decrement} />
              </button>
              <input
                type="number"
                className="w-16 border-x text-center"
                value="1"
                onChange={handleChange}
              />
              <button className="p-3 hover:bg-gray-100">
                <Plus className="w-4 h-4" onClick={increment} />
              </button>
            </div>
            <Button className="flex-1 bg-white text-black border text-lg py-5 hover:bg-gray-100 rounded-xl">
              Add To Cart
            </Button>
          </div>

          <div className="space-y-2 pt-6 border-t">
            <div className="flex gap-2">
              <span className="text-gray-600 w-24">SKU</span>
              <span>: SS001</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-600 w-24">Category</span>
              <span>: Sofas</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-600 w-24">Tags</span>
              <span>: Sofa, Chair, Home, Shop</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-600 w-24">Share</span>
              <div className="flex gap-4">
                <Facebook className="w-5 h-5" />
                <Linkedin className="w-5 h-5" />
                <Twitter className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
