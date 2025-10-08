# Supabase Setup Guide (Tables, RLS, Policies, Seed)

This guide helps you create the required tables, enable RLS, add public policies, and seed sample menu items for the restaurant_frontend.

Prerequisites:
- You must have a working Postgres connection for your Supabase project's database.
- Provide a db_connection.txt file in this directory (restaurant_frontend) with a single line containing a fully formed psql connection command that includes the connection string and the -c flag placeholder. Example:
  psql \"postgres://USER:PASSWORD@HOST:PORT/DBNAME?sslmode=require\"

Note:
- The execution must be one SQL statement per command as per guidelines. Below are the commands to run one-by-one.

SQL statements to execute (run each in a separate command):
1) Create menu_items table:
   CREATE TABLE IF NOT EXISTS public.menu_items (
     id BIGSERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     description TEXT,
     price NUMERIC(10,2) NOT NULL,
     category TEXT,
     image_url TEXT,
     is_available BOOLEAN DEFAULT TRUE,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

2) Create reservations table:
   CREATE TABLE IF NOT EXISTS public.reservations (
     id BIGSERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT,
     phone TEXT,
     party_size INTEGER NOT NULL,
     reservation_time TIMESTAMPTZ NOT NULL,
     notes TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

3) Enable RLS for menu_items:
   ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

4) Enable RLS for reservations:
   ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

5) Public read menu policy:
   CREATE POLICY IF NOT EXISTS "Public read menu"
   ON public.menu_items
   FOR SELECT
   USING (TRUE);

6) Public insert reservations policy:
   CREATE POLICY IF NOT EXISTS "Public insert reservations"
   ON public.reservations
   FOR INSERT
   WITH CHECK (TRUE);

Seed statements (run each separately):
7) INSERT INTO public.menu_items (name, description, price, category, image_url)
   VALUES ('Truffle Arancini', 'Crispy risotto balls with parmesan and truffle aioli', 12.00, 'Starters', NULL);

8) INSERT INTO public.menu_items (name, description, price, category, image_url)
   VALUES ('Heirloom Tomato Salad', 'Burrata, basil oil, aged balsamic', 11.50, 'Starters', NULL);

9) INSERT INTO public.menu_items (name, description, price, category, image_url)
   VALUES ('Pan-Seared Salmon', 'Lemon beurre blanc, asparagus, fingerlings', 24.00, 'Mains', NULL);

10) INSERT INTO public.menu_items (name, description, price, category, image_url)
    VALUES ('Porcini Tagliatelle', 'Hand-cut pasta, porcini cream, pecorino', 19.50, 'Mains', NULL);

11) INSERT INTO public.menu_items (name, description, price, category, image_url)
    VALUES ('Dark Chocolate Torte', 'Sea salt, crème fraîche', 9.00, 'Desserts', NULL);

12) INSERT INTO public.menu_items (name, description, price, category, image_url)
    VALUES ('Lavender Lemonade', 'House-made, floral and refreshing', 6.00, 'Drinks', NULL);

How to run (one statement per command):
- After creating restaurant_frontend/db_connection.txt with your connection string, run each command as:
  $(cat db_connection.txt) -c "<SQL_GOES_HERE>"

Example:
  $(cat db_connection.txt) -c "CREATE TABLE IF NOT EXISTS public.menu_items (id BIGSERIAL PRIMARY KEY, name TEXT NOT NULL, description TEXT, price NUMERIC(10,2) NOT NULL, category TEXT, image_url TEXT, is_available BOOLEAN DEFAULT TRUE, created_at TIMESTAMPTZ DEFAULT NOW());"

Remember to run all statements one-by-one in sequence.

Validation:
- Verify tables exist:
  $(cat db_connection.txt) -c "\\dt public.*"
- Verify policies:
  $(cat db_connection.txt) -c "SELECT schemaname, tablename, policyname, cmd FROM pg_policies WHERE schemaname='public';"
- Verify seed:
  $(cat db_connection.txt) -c "SELECT id, name, price, category FROM public.menu_items ORDER BY id LIMIT 10;"

Environment variables (frontend):
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_KEY

Ensure these are set in your .env.local so the frontend can read the menu and create reservations.
