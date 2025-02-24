"use client";

import { Loader2 } from "lucide-react";

export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      <p className="mt-2 text-gray-600">Yuklanmoqda...</p>
    </div>
  );
}
