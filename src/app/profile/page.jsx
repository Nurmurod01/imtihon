"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";
import { useGetOneOrdersQuery, useGetOneUsersQuery } from "@/lib/service/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const { toast } = useToast();
  const data = useSelector((state) => state.auth);
  const userId = data?.user?.id;

  const {
    data: user,
    isLoading,
    error,
  } = useGetOneUsersQuery(userId, { skip: !userId });

  const {
    data: order,
    isLoading: loading,
    error: xatolik,
  } = useGetOneOrdersQuery(userId);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch user data. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F9F1E7]">
        <p className="text-xl text-[#B88E2F]">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#B88E2F]">
        Profile
      </h1>
      {user ? (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
          <Card>
            <CardContent>
              <div className="space-y-4">
                <p className="text-lg font-semibold">
                  Name: <span className="text-gray-700">{user.name}</span>
                </p>
                <p className="text-lg font-semibold">
                  Email: <span className="text-gray-700">{user.email}</span>
                </p>
                {user.role == "admin" ? (
                  <p className="text-lg font-semibold">
                    Role:
                    <span className="text-gray-700 capitalize">
                      {user.role}
                    </span>
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl text-center font-bold mt-8 mb-4 text-[#B88E2F]">
            My Orders
          </h2>

          <Table className="border">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="font-bold">ID</TableHead>
                <TableHead className="font-bold">Username</TableHead>
                <TableHead className="font-bold">Total Price</TableHead>
                <TableHead className="font-bold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order &&
                order.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-center text-gray-600">User not found.</p>
      )}
    </div>
  );
}
