/*
  # Update RLS policies for countdowns table

  1. Changes
    - Remove existing RLS policy
    - Add new policies for:
      - Select: Allow authenticated users to read all countdowns
      - Insert: Allow authenticated users to create countdowns
      - Update: Allow authenticated users to update countdowns
      - Delete: Allow authenticated users to delete countdowns

  2. Security
    - Enable RLS on countdowns table
    - Policies restricted to authenticated users only
    - No access for anonymous users
*/

-- Drop existing policy
DROP POLICY IF EXISTS "Enable full access for authenticated users" ON countdowns;

-- Create new specific policies
CREATE POLICY "Allow authenticated users to read countdowns"
  ON countdowns
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to create countdowns"
  ON countdowns
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update countdowns"
  ON countdowns
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete countdowns"
  ON countdowns
  FOR DELETE
  TO authenticated
  USING (true);