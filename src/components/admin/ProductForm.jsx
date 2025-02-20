"use client";

import { useState } from "react";
import { useAddProductMutation, useUpdateProductMutation } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function ProductForm({ product, onSuccess }) {
  const [formData, setFormData] = useState(
    product || {
      name: "",
      category: "",
      price: 0,
      description: "",
    }
  );

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product?.id) {
        await updateProduct({ id: product.id, ...formData }).unwrap();
      } else {
        await addProduct(formData).unwrap();
      }
      toast({
        title: `Product ${product ? "updated" : "added"} successfully`,
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
          placeholder="Product name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <Input
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
      </div>
      <div>
        <Input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
        />
      </div>
      <div>
        <Textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>
      <Button type="submit">
        {product ? "Update Product" : "Add Product"}
      </Button>
    </form>
  );
}
