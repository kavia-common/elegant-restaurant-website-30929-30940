import Link from "next/link";

// PUBLIC_INTERFACE
export default function Hero() {
  /** Hero section with gradient background and call to action. */
  return (
    <section className="relative gradient-soft">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.25),transparent_60%)]" />
      <div className="container relative py-24 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-purple-800">
          Elegant Dining, Unforgettable Moments
        </h1>
        <p className="mt-4 text-lg md:text-xl text-secondary max-w-2xl mx-auto">
          Savor refined flavors and a luxurious ambiance crafted for special occasions and everyday indulgence.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/reservation" className="btn-primary">
            Reserve a Table
          </Link>
          <Link href="/menu" className="btn-outline">
            View Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
