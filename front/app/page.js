export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">You are in, my friend</h1>

      {/* TODO: show who is logged in once you can read the token. */}
      <p className="text-zinc-500">
        This page should only be visible to logged in users.
      </p>

      {/* TODO: wire this button up so it clears the token and redirects to /login. */}
      <button
        type="button"
        className="rounded-full bg-black px-6 py-2 font-medium text-white transition-colors hover:bg-zinc-700"
      >
        Log out
      </button>
    </main>
  );
}
