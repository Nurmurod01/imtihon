"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLogInMutation } from "@/lib/service/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth"; // useAuth hook'ini import qilish

export default function LoginPage() {
  const router = useRouter();
  const [logIn] = useLogInMutation();
  const { isLoggedIn, login, user } = useAuth(); // useAuth hook'idan foydalanish

  useEffect(() => {
    if (isLoggedIn && user) {
      router.push("/");
    }
  }, [isLoggedIn, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await logIn({ email, password }).unwrap();
      
      login(result.accessToken); 
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.data?.message || "Login error occurred.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Login to Your Account</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Please enter your details.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="email" name="email" placeholder="Email" required />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Button type="submit" className="w-full">
          Log in
        </Button>
      </form>
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
