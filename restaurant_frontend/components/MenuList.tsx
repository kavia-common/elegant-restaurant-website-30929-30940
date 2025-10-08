import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchMenuItems, type MenuItem } from "@/lib/supabaseClient";

// PUBLIC_INTERFACE
export default function MenuList() {
  /**
   * Fetches and displays menu items from Supabase with graceful states.
   */
  const [items, setItems] = useState<MenuItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetchMenuItems();
      if (!mounted) return;
      if (res.error) {
        setError(res.error);
        setItems(null);
      } else {
        setItems(res.data ?? []);
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card p-4 animate-pulse">
            <div className="h-40 bg-purple-100 rounded-lg" />
            <div className="mt-4 h-5 w-2/3 bg-purple-100 rounded" />
            <div className="mt-2 h-4 w-full bg-purple-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-6 border border-red-100">
        <p className="text-error">Unable to load menu: {error}</p>
        <p className="text-secondary mt-2">
          Please check your Supabase configuration and try again.
        </p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="card p-6">
        <p className="text-secondary">No menu items available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.id} className="card overflow-hidden">
          <div className="relative h-44 w-full bg-purple-50">
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-secondary">
                No image
              </div>
            )}
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <span className="text-[--color-primary] font-medium">
                ${Number(item.price).toFixed(2)}
              </span>
            </div>
            {item.category && (
              <div className="mt-1 text-xs text-secondary">{item.category}</div>
            )}
            <p className="mt-3 text-sm text-secondary">{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
