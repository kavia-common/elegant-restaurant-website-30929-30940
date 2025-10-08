import { FormEvent, useState } from "react";
import { createReservation } from "@/lib/supabaseClient";

// Basic client-side validators
function isEmail(s: string) {
  return /\S+@\S+\.\S+/.test(s);
}
function isPhone(s: string) {
  return /^[0-9()+\-\s]{7,}$/.test(s);
}

// PUBLIC_INTERFACE
export default function ReservationForm() {
  /**
   * Reservation form with validation and insertion into Supabase.
   */
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const party_size = Number(fd.get("party_size") || 0);
    const date = String(fd.get("date") || "");
    const time = String(fd.get("time") || "");
    const notes = String(fd.get("notes") || "").trim();

    // Validation
    if (name.length < 2) return setErrorMsg("Please enter your full name.");
    if (!isEmail(email)) return setErrorMsg("Please enter a valid email.");
    if (!isPhone(phone)) return setErrorMsg("Please enter a valid phone.");
    if (!Number.isFinite(party_size) || party_size < 1)
      return setErrorMsg("Party size must be at least 1.");
    if (!date) return setErrorMsg("Please select a date.");
    if (!time) return setErrorMsg("Please select a time.");

    setLoading(true);
    const res = await createReservation({
      name,
      email,
      phone,
      party_size,
      date,
      time,
      notes: notes || null,
    });
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || "Unable to create reservation.");
    } else {
      setSuccessMsg("Reservation submitted! We will confirm via email.");
      (e.currentTarget as HTMLFormElement).reset();
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 md:p-8">
      <h3 className="text-xl font-semibold">Reserve your table</h3>
      <p className="text-secondary mt-1">
        Fill in the details below and we will confirm your reservation.
      </p>

      {errorMsg && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-error">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-success">
          {successMsg}
        </div>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="text-sm font-medium" htmlFor="name">Name</label>
          <input
            className="mt-1 rounded-lg border border-purple-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[--color-primary]"
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium" htmlFor="email">Email</label>
          <input
            className="mt-1 rounded-lg border border-purple-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[--color-primary]"
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium" htmlFor="phone">Phone</label>
          <input
            className="mt-1 rounded-lg border border-purple-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[--color-primary]"
            id="phone"
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium" htmlFor="party_size">Party Size</label>
          <input
            className="mt-1 rounded-lg border border-purple-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[--color-primary]"
            id="party_size"
            name="party_size"
            type="number"
            min={1}
            defaultValue={2}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium" htmlFor="date">Date</label>
          <input
            className="mt-1 rounded-lg border border-purple-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[--color-primary]"
            id="date"
            name="date"
            type="date"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium" htmlFor="time">Time</label>
          <input
            className="mt-1 rounded-lg border border-purple-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[--color-primary]"
            id="time"
            name="time"
            type="time"
            required
          />
        </div>
        <div className="md:col-span-2 flex flex-col">
          <label className="text-sm font-medium" htmlFor="notes">Notes (optional)</label>
          <textarea
            className="mt-1 rounded-lg border border-purple-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[--color-primary]"
            id="notes"
            name="notes"
            placeholder="Dietary requirements, occasion, etc."
            rows={3}
          />
        </div>
      </div>

      <div className="mt-6">
        <button className="btn-primary" type="submit" disabled={loading} aria-busy={loading}>
          {loading ? "Submitting..." : "Submit Reservation"}
        </button>
      </div>
    </form>
  );
}
