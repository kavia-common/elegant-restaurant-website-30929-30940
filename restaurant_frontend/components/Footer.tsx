import Link from "next/link";

// PUBLIC_INTERFACE
export default function Footer() {
  /** Elegant footer with basic site info and links. */
  return (
    <footer className="mt-16 border-t border-purple-100 bg-white/60">
      <div className="container py-10 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-semibold">Royale</h3>
          <p className="text-secondary mt-2">
            Refined dining with a modern touch. Experience the elegance.
          </p>
        </div>
        <div>
          <h4 className="font-medium">Navigation</h4>
          <ul className="mt-2 space-y-1">
            <li><Link className="hover:underline" href="/">Home</Link></li>
            <li><Link className="hover:underline" href="/menu">Menu</Link></li>
            <li><Link className="hover:underline" href="/reservation">Reservation</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Contact</h4>
          <p className="mt-2 text-secondary">
            123 Royale Ave, Purple City
            <br />
            (555) 123-4567
            <br />
            hello@royale.restaurant
          </p>
        </div>
      </div>
      <div className="text-center text-sm text-secondary py-4">
        © {new Date().getFullYear()} Royale. All rights reserved.
      </div>
    </footer>
  );
}
