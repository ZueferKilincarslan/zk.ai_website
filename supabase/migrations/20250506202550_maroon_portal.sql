/*
  # Create Countdowns Table

  1. New Tables
    - `countdowns`
      - `id` (uuid, primary key)
      - `title` (text)
      - `target_date` (timestamptz)
      - `is_active` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for admin access
*/

CREATE TABLE IF NOT EXISTS countdowns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  target_date timestamptz NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE countdowns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable full access for authenticated users"
  ON countdowns
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);