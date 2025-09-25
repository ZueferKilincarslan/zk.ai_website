/*
  # Create contacts table for form submissions

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `full_name` (text, required)
      - `email` (text, required)
      - `message` (text, required)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `contacts` table
    - Add policy for authenticated users to read contacts
    - Add policy for public users to insert contacts (for form submissions)
*/

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow public users to insert contact form submissions
CREATE POLICY "Allow public contact form submissions"
  ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users (admins) to read all contacts
CREATE POLICY "Allow authenticated users to read contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users (admins) to update contacts
CREATE POLICY "Allow authenticated users to update contacts"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users (admins) to delete contacts
CREATE POLICY "Allow authenticated users to delete contacts"
  ON contacts
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();