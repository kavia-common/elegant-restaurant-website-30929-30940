import Head from "next/head";
import MenuList from "@/components/MenuList";

export default function MenuPage() {
  /**
   * Menu page displays items fetched from Supabase with graceful states.
   */
  return (
    <>
      <Head>
        <title>Menu | Royale Restaurant</title>
        <meta name="description" content="Explore our refined menu." />
      </Head>
      <section className="mb-8">
        <h1 className="text-3xl font-bold">Our Menu</h1>
        <p className="text-secondary mt-2">
          Explore seasonal dishes and signature favorites.
        </p>
      </section>
      <MenuList />
    </>
  );
}
