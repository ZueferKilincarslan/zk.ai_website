/*
  # Fix contacts table RLS policies

  1. Security Updates
    - Check and create RLS policies only if they don't exist
    - Allow anonymous users to submit contact forms (INSERT)
    - Allow authenticated users to manage contacts (SELECT, UPDATE, DELETE)

  2. Policy Details
    - "Allow public contact form submissions": Anonymous users can insert contact forms
    - "Allow authenticated users to read contacts": Admins can view all contacts
    - "Allow authenticated users to update contacts": Admins can modify contacts
    - "Allow authenticated users to delete contacts": Admins can remove contacts
*/

-- Drop the overly restrictive policy if it exists
DROP POLICY IF EXISTS "Allow access for authenticated users" ON contacts;

-- Create policy for anonymous contact form submissions (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contacts' 
    AND policyname = 'Allow public contact form submissions'
  ) THEN
    CREATE POLICY "Allow public contact form submissions"
      ON contacts
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END $$;

-- Create policy for authenticated users to read contacts (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contacts' 
    AND policyname = 'Allow authenticated users to read contacts'
  ) THEN
    CREATE POLICY "Allow authenticated users to read contacts"
      ON contacts
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Create policy for authenticated users to update contacts (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contacts' 
    AND policyname = 'Allow authenticated users to update contacts'
  ) THEN
    CREATE POLICY "Allow authenticated users to update contacts"
      ON contacts
      FOR UPDATE
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Create policy for authenticated users to delete contacts (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contacts' 
    AND policyname = 'Allow authenticated users to delete contacts'
  ) THEN
    CREATE POLICY "Allow authenticated users to delete contacts"
      ON contacts
      FOR DELETE
      TO authenticated
      USING (true);
  END IF;
END $$;