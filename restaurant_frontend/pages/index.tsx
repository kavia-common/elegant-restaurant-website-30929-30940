import Head from "next/head";
import Hero from "@/components/Hero";

export default function HomePage() {
  /**
   * Home page featuring hero section and highlights.
   */
  return (
    <>
      <Head>
        <title>Royale Restaurant</title>
        <meta name="description" content="Elegant dining with a touch of luxury." />
      </Head>
      <Hero />
      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          { title: "Seasonal Menu", desc: "Locally sourced ingredients, crafted by our chef." },
          { title: "Fine Wines", desc: "Curated selection to complement your meal." },
          { title: "Private Events", desc: "Host your celebrations in style." },
        ].map((c) => (
          <div key={c.title} className="card p-6">
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="text-secondary mt-2">{c.desc}</p>
          </div>
        ))}
      </section>
    </>
  );
}
