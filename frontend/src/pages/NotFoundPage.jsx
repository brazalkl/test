import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center gap-4 p-6">
      <h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
      <p className="text-gray-600">The route you requested does not exist.</p>
      <div>
        <Link to="/" className="rounded-md border px-4 py-2">
          Back Home
        </Link>
      </div>
    </main>
  );
}
