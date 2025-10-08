import Head from "next/head";
import ReservationForm from "@/components/ReservationForm";

export default function ReservationPage() {
  /**
   * Reservation page with a form to insert data into Supabase.
   */
  return (
    <>
      <Head>
        <title>Reservation | Royale Restaurant</title>
        <meta name="description" content="Reserve a table at Royale." />
      </Head>
      <section className="mb-8">
        <h1 className="text-3xl font-bold">Reservation</h1>
        <p className="text-secondary mt-2">
          Choose your preferred date and time, and we’ll confirm your booking.
        </p>
      </section>
      <ReservationForm />
    </>
  );
}
