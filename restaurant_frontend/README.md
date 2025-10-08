# Royale Restaurant Frontend

Elegant Next.js (Pages Router) app with a Royal Purple theme. Includes Home, Menu, and Reservation pages with Supabase integration.

## Tech
- Next.js 15 (Pages Router)
- React 19
- Tailwind CSS v4
- Supabase JS v2

## Env variables
Create a `.env.local` with:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_KEY

See `.env.example`.

## Scripts
- npm run dev
- npm run build
- npm run start

## Data tables (Supabase)
- menu_items: id, name, description, price, category, image_url
- reservations: id, name, email, phone, party_size, date, time, notes

## Notes
- App shows loading/empty/error states on the Menu page.
- Reservation form validates inputs and provides success/error feedback.
- The Supabase client logs a warning if env vars are missing.
