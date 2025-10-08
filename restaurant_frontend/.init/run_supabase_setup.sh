#!/usr/bin/env bash
# Runs Supabase DB setup statements one-by-one using psql.
# Requires a db_connection.txt file containing a single line with the psql connection command:
#   psql "postgres://USER:PASSWORD@HOST:PORT/DBNAME?sslmode=require"

set -euo pipefail

BASE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$BASE_DIR"

if [ ! -f "db_connection.txt" ]; then
  echo "[ERROR] db_connection.txt not found in $(pwd)."
  echo "Create it with your Supabase psql connection string. Example:"
  echo 'psql "postgres://USER:PASSWORD@HOST:PORT/DBNAME?sslmode=require"'
  exit 1
fi

PSQL_CMD="$(cat db_connection.txt)"

run_sql() {
  local stmt="$1"
  echo "Executing: $stmt"
  ${PSQL_CMD} -c "$stmt"
}

# 1) Create tables
run_sql "CREATE TABLE IF NOT EXISTS public.menu_items (id BIGSERIAL PRIMARY KEY, name TEXT NOT NULL, description TEXT, price NUMERIC(10,2) NOT NULL, category TEXT, image_url TEXT, is_available BOOLEAN DEFAULT TRUE, created_at TIMESTAMPTZ DEFAULT NOW());"
run_sql "CREATE TABLE IF NOT EXISTS public.reservations (id BIGSERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT, phone TEXT, party_size INTEGER NOT NULL, reservation_time TIMESTAMPTZ NOT NULL, notes TEXT, created_at TIMESTAMPTZ DEFAULT NOW());"

# 2) Enable RLS
run_sql "ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;"
run_sql "ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;"

# 3) Policies
run_sql "CREATE POLICY IF NOT EXISTS \"Public read menu\" ON public.menu_items FOR SELECT USING (TRUE);"
run_sql "CREATE POLICY IF NOT EXISTS \"Public insert reservations\" ON public.reservations FOR INSERT WITH CHECK (TRUE);"

# 4) Seed data
run_sql "INSERT INTO public.menu_items (name, description, price, category, image_url) VALUES ('Truffle Arancini', 'Crispy risotto balls with parmesan and truffle aioli', 12.00, 'Starters', NULL);"
run_sql "INSERT INTO public.menu_items (name, description, price, category, image_url) VALUES ('Heirloom Tomato Salad', 'Burrata, basil oil, aged balsamic', 11.50, 'Starters', NULL);"
run_sql "INSERT INTO public.menu_items (name, description, price, category, image_url) VALUES ('Pan-Seared Salmon', 'Lemon beurre blanc, asparagus, fingerlings', 24.00, 'Mains', NULL);"
run_sql "INSERT INTO public.menu_items (name, description, price, category, image_url) VALUES ('Porcini Tagliatelle', 'Hand-cut pasta, porcini cream, pecorino', 19.50, 'Mains', NULL);"
run_sql "INSERT INTO public.menu_items (name, description, price, category, image_url) VALUES ('Dark Chocolate Torte', 'Sea salt, crème fraîche', 9.00, 'Desserts', NULL);"
run_sql "INSERT INTO public.menu_items (name, description, price, category, image_url) VALUES ('Lavender Lemonade', 'House-made, floral and refreshing', 6.00, 'Drinks', NULL);"

echo "Supabase DB setup completed successfully."
