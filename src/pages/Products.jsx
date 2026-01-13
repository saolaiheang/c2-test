import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    const offset = (page - 1) * limit;
    fetch(
      `https://api.escuelajs.co/api/v1/products?limit=${limit}&offset=${offset}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, [page]);

  const items = products;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-slate-600">Manage your product catalog</p>
        </div>

        <Link
          to="/products/new"
          className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          + Add product
        </Link>
      </div>

      <div className="grid gap-4">
        {items.map((p) => (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className="rounded-xl border bg-white p-4 hover:shadow-sm transition"
          >
            <img
              src={p.images?.[0] ?? "https://placehold.co/600x400"}
              alt={p.title}
              className="h-40 w-full rounded-lg object-cover"
              loading="lazy"
            />
            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <div className="font-medium line-clamp-1">{p.title}</div>
                <div className="text-sm text-slate-600 line-clamp-1">
                  {p.category?.name}
                </div>
              </div>
              <div className="shrink-0 font-semibold">${p.price}</div>
            </div>

            <p className="mt-2 text-sm text-slate-600 line-clamp-2">
              {p.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
