"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
  useDeleteCartItemMutation,
  useGetCartItemsQuery,
  useUpdateCartItemMutation,
  useAddOrderMutation,
} from "@/lib/service/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function Cart() {
  const [userid, setUserid] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Credit card");

  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserid(storedUserId);
    }
  }, []);

  const { data: cartItems = [], isLoading } = useGetCartItemsQuery(userid, {
    skip: !userid,
  });

  const [removeCartItem] = useDeleteCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [addOrder] = useAddOrderMutation();

  const updateQuantity = useCallback(
    async (id, newQuantity) => {
      if (newQuantity < 1) return;
      try {
        await updateCartItem({ id, quantity: newQuantity }).unwrap();
      } catch (error) {
        toast.error("An error occurred while updating!");
      }
    },
    [updateCartItem]
  );

  const removeItem = useCallback(
    async (id) => {
      try {
        await removeCartItem(id).unwrap();
        toast.success("Product deleted!");
      } catch (error) {
        toast.error("An error occurred while deleting!");
      }
    },
    [removeCartItem]
  );

  const handleCheckout = useCallback(async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method!");
      return;
    }
    try {
      await addOrder({
        userId: userid,
        totalPrice: cartItems.reduce(
          (sum, { product, quantity }) => sum + product.price * quantity,
          0
        ),
        paymentMethod,
      }).unwrap();
      toast.success("The order was successfully created!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("There was an error placing the order!");
    }
  }, [paymentMethod, userid, cartItems, addOrder]);

  const subtotal = cartItems.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );
  const formatPrice = (price) => `${price.toFixed(2)} $`;

  if (isLoading) return <p className="text-center">Loading...</p>;

  if (!cartItems.length) {
    return (
      <div className="flex flex-col justify-center items-center p-52 space-y-7">
        <p className="text-2xl text-gray-500">Cart is empty</p>
        <Button
          className="bg-[#B88E2F] hover:bg-[#aa842b]"
          onClick={() => router.push("/shop")}
        >
          Go to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="  overflow-hidden">
            {/* Header */}
            <div className="bg-[#F9F1E7] grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium">
              <div className="col-span-6">Product</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Subtotal</div>
            </div>

            {/* Cart Items */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 p-4 items-center "
              >
                <div className="col-span-6 flex items-center gap-4">
                  <div className="relative w-20 h-20 bg-white rounded">
                    <Image
                      src={`http://localhost:3004/media/products/${item.product.imgUrl}`}
                      alt={item.product.name}
                      fill
                      className="object-cover bg-[#F9F1E7] rounded-lg p-2"
                    />
                  </div>
                  <span className="font-medium">{item.product.name}</span>
                </div>
                <div className="col-span-2">
                  {formatPrice(item.product.price)}
                </div>
                <div className="col-span-2">
                  <div className="flex items-center border rounded w-24">
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
                          Number.parseInt(e.target.value) || 1
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
                  <span>{formatPrice(item.product.price * item.quantity)}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[#B88E2F] hover:text-[#aa842b]"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Totals */}
        <div className="lg:col-span-1">
          <div className="bg-[#F9F1E7]  p-6 space-y-4">
            <h2 className="text-2xl font-bold">Cart Totals</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span className="text-gray-600">{paymentMethod}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span className="text-[#B88E2F]">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <Button
              variant="outlined"
              className="w-full bg-none text-black border-black border hover:border-[#B88E2F]/90 hover:bg-[#B88E2F]/90 hover:text-white"
              onClick={() => setIsModalOpen(true)}
            >
              Check Out
            </Button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-12 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Payment Method</h2>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="w-full border p-2">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="payme">Payme</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                className="bg-gray-500"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button className="bg-[#B88E2F]" onClick={handleCheckout}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
