import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch products", error);
      });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      description: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, form);
      } else {
        await api.post("/products", form);
      }

      resetForm();
      await fetchProducts();
    } catch (error) {
      console.error("Save failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description || "",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    try {
      await api.delete(`/products/${id}`);
      await fetchProducts();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Product CRUD</h1>
        <Link to="/" className="rounded-md border px-4 py-2">
          Home
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-white p-4">
        <div>
          <label className="mb-1 block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Product name"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Price"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Description"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            {loading ? "Saving..." : editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-md border px-4 py-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="flex items-start justify-between rounded-xl border bg-white p-4"
            >
              <div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-600">PHP {product.price}</p>
                <p className="mt-1 text-sm">{product.description}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="rounded-md border px-3 py-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="rounded-md bg-red-500 px-3 py-1 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
