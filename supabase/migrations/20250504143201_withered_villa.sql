/*
  # Analytics Tables Setup

  1. New Tables
    - `page_views`
      - `id` (uuid, primary key)
      - `timestamp` (timestamptz)
      - `user_id` (uuid, nullable)
      - `session_id` (uuid)
      - `created_at` (timestamptz)

    - `monthly_users` (view)
      - Aggregates unique users per month from page_views

  2. Security
    - Enable RLS on page_views table
    - Add policies for inserting and viewing analytics data
*/

-- Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  session_id uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert for authenticated users"
  ON page_views
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable viewing for authenticated users"
  ON page_views
  FOR SELECT
  TO authenticated
  USING (true);

-- Create monthly_users view
CREATE OR REPLACE VIEW monthly_users AS
SELECT
  to_char(date_trunc('month', timestamp), 'YYYY-MM') as month,
  COUNT(DISTINCT COALESCE(user_id, session_id)) as unique_users
FROM page_views
GROUP BY date_trunc('month', timestamp)
ORDER BY date_trunc('month', timestamp);

-- Grant access to the view
GRANT SELECT ON monthly_users TO authenticated;