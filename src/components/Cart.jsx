"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Detail } from "@/images";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Asgaard sofa",
      price: 250000.0,
      quantity: 1,
      image: Detail,
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatPrice = (price) => {
    return `Rs. ${price.toFixed(2)}`;
  };

  return (
    <div className=" px-4 py-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        <div className="lg:col-span-2 w-full">
          <div className=" overflow-hidden w-full">
            <div className="grid grid-cols-12 gap-4 p-4 border-b text-sm  font-bold bg-[#F9F1E7]">
              <div className="col-span-6">Product</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Subtotal</div>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 p-4 items-center border-b"
              >
                <div className="col-span-6 flex items-center gap-4">
                  <div className="relative w-20 h-20 bg-[#F9F1E7] rounded">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="col-span-2">{formatPrice(item.price)}</div>
                <div className="col-span-2">
                  <div className="flex items-center border rounded w-[104px]">
                    <button
                      className="px-3 py-1 hover:bg-gray-100"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.id,
                          shop.parseInt(e.target.value) || 1
                        )
                      }
                      className="w-10 text-center border-x"
                    />
                    <button
                      className="px-3 py-1 hover:bg-gray-100"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-between">
                  <span>{formatPrice(item.price * item.quantity)}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[#B88E2F] "
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#F9F1E7] rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold">Cart Totals</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-gray-600">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span className="text-[#B88E2F]">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <Button
              className="w-full bg-[#B88E2F] hover:bg-[#B88E2F]/90 text-white"
              onClick={() => console.log("Proceeding to checkout...")}
            >
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
