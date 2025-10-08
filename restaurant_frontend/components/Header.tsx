import Link from "next/link";
import { useRouter } from "next/router";
import { theme } from "@/utils/theme";

// PUBLIC_INTERFACE
export default function Header() {
  /** Site header with navigation links to Home, Menu, and Reservation. */
  const router = useRouter();
  const nav = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/reservation", label: "Reservation" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-purple-100">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="inline-block h-8 w-8 rounded-full"
            style={{ background: theme.colors.primary }}
            aria-hidden
          />
          <span className="text-lg font-semibold tracking-tight text-[--color-text]">
            Royale
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {nav.map((n) => {
            const active = router.pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`px-4 py-2 rounded-full transition ${
                  active
                    ? "bg-[--color-primary] text-white"
                    : "text-[--color-text] hover:bg-purple-100"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/reservation"
          className="btn-primary hidden md:inline-flex"
          aria-label="Reserve a table"
        >
          Reserve
        </Link>
      </div>
    </header>
  );
}
