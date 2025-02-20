"use client";

import { useState } from "react";
import { useAddCategoryMutation, useUpdateCategoryMutation } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function CategoryForm({ category, onSuccess }) {
  const [formData, setFormData] = useState(
    category || {
      name: "",
      description: "",
    }
  );

  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (category?.id) {
        await updateCategory({ id: category.id, ...formData }).unwrap();
      } else {
        await addCategory(formData).unwrap();
      }
      toast({
        title: `Category ${category ? "updated" : "added"} successfully`,
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
          placeholder="Category name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
        {category ? "Update Category" : "Add Category"}
      </Button>
    </form>
  );
}
