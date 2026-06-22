"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TOKEN_KEY = "token";

function getEmailFromToken(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.email ?? null;
  } catch {
    return null;
  }
}

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      router.replace("/login");
      return;
    }

    setEmail(getEmailFromToken(token));
    setReady(true);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    router.push("/login");
  }

  if (!ready) {
    return null;
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">You are in, my friend</h1>

      {email && (
        <p className="text-zinc-500">
          Logged in as <span className="font-medium text-white">{email}</span>
        </p>
      )}

      <button
        type="button"
        onClick={handleLogout}
        className="rounded-full bg-black px-6 py-2 font-medium text-white transition-colors hover:bg-zinc-700"
      >
        Log out
      </button>
    </main>
  );
}
