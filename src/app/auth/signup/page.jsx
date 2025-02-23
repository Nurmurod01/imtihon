"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSignUpMutation } from "@/lib/service/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup] = useSignUpMutation();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ name, email, password, role: "user" }).unwrap();
      setTimeout(() => {
        toast.success("Signup successful. Please log in.");
        router.push("/auth/login");
      }, 1000);
    } catch (error) {
      toast.error(error.data?.message || "An error occurred during signup.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create an Account</h1>
        <p className="text-gray-600 mt-2">
          Sign up to get started with our service.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </form>
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
