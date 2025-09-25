/*
  # Fix RLS policy for anonymous contact form submissions

  1. Security Changes
    - Update RLS policy to allow anonymous users to insert contact form data
    - Keep existing policies for authenticated users to manage contacts
    - Ensure public users can only insert, not read/update/delete

  This migration fixes the "new row violates row-level security policy" error
  by allowing anonymous users to submit contact forms.
*/

-- Drop the existing restrictive policy that only allows authenticated users
DROP POLICY IF EXISTS "Allow access for authenticated users" ON contacts;

-- Create specific policies for different operations
CREATE POLICY "Allow public contact form submissions"
  ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update contacts"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete contacts"
  ON contacts
  FOR DELETE
  TO authenticated
  USING (true);