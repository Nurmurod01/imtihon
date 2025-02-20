"use client";

import { useState } from "react";
import { useAddOrderMutation, useUpdateOrderMutation } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function OrderForm({ order, onSuccess }) {
  const [formData, setFormData] = useState(
    order || {
      user: 0,
      products: [],
      total: 0,
      status: "pending",
    }
  );

  const [addOrder] = useAddOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (order?.id) {
        await updateOrder({ id: order.id, ...formData }).unwrap();
      } else {
        await addOrder(formData).unwrap();
      }
      toast({
        title: `Order ${order ? "updated" : "added"} successfully`,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="number"
          placeholder="User ID"
          value={formData.user}
          onChange={(e) =>
            setFormData({ ...formData, user: Number(e.target.value) })
          }
        />
      </div>
      <div>
        <Input
          type="number"
          placeholder="Total"
          value={formData.total}
          onChange={(e) =>
            setFormData({ ...formData, total: Number(e.target.value) })
          }
        />
      </div>
      <div>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <Button type="submit">{order ? "Update Order" : "Add Order"}</Button>
    </form>
  );
}
