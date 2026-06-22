"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const API_URL = "http://localhost:5005";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 201) {
      sessionStorage.setItem("signupSuccess", "1");
      router.push("/login");
      return;
    }

    if (res.status === 409) {
      setError(data.message);
      return;
    }

    setError(data.message || "Something went wrong.");
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">Sign up</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-zinc-300 px-4 py-2 outline-none focus:border-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-zinc-300 px-4 py-2 outline-none focus:border-black"
            required
          />
          <button
            type="submit"
            className="rounded-lg bg-black px-4 py-2 font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Create account
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        <p className="mt-6 text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-white underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
