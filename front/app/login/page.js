"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5005";
const TOKEN_KEY = "token";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("signupSuccess") === "1") {
      sessionStorage.removeItem("signupSuccess");
      setCreated(true);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 200 && data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
      router.push("/");
      return;
    }

    if (res.status === 401) {
      setError(data.message);
      return;
    }

    setError(data.message || "Something went wrong.");
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">Log in</h1>

        {created && (
          <p className="mb-4 text-sm text-green-600" role="status">
            Account created. You can log in now.
          </p>
        )}

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
            Log in
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        <p className="mt-6 text-sm text-zinc-500">
          No account yet?{" "}
          <Link href="/signup" className="font-medium text-white underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
