import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MyApp({ Component, pageProps }: AppProps) {
  /**
   * App entrypoint for the Pages Router.
   * Wraps content with Header and Footer and loads global styles.
   */
  return (
    <>
      <Header />
      <main className="container py-8">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
