"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLogInMutation } from "@/lib/service/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "@/lib/slices/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation] = useLogInMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginMutation({ email, password }).unwrap();
      dispatch(
        login({
          user: result.user,
          token: result.accessToken,
          role: result.user.role,
        })
      );
      toast.success("You have successfully logged in.");
      router.push("/");
    } catch (error) {
      console.log(error);

      toast.error("Login failed");
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
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
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
