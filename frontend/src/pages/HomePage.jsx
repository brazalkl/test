import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center gap-6 p-6">
      <div className="space-y-4 rounded-2xl border bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Product Manager
        </p>
        <h1 className="text-4xl font-bold text-gray-900">Frontend routes are live.</h1>
        <p className="max-w-2xl text-base text-gray-600">
          This app now uses React Router. Open the products route to manage your CRUD data.
        </p>
        <div className="flex gap-3">
          <Link
            to="/products"
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            Open Products
          </Link>
        </div>
      </div>
    </main>
  );
}
