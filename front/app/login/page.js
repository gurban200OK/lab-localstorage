import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">Log in</h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="rounded-lg border border-zinc-300 px-4 py-2 outline-none focus:border-black"
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-lg border border-zinc-300 px-4 py-2 outline-none focus:border-black"
          />
          <button
            type="submit"
            className="rounded-lg bg-black px-4 py-2 font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Log in
          </button>
        </form>

        {/* TODO: show a message here when the login fails. */}

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
