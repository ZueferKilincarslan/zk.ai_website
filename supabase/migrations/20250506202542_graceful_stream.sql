/*
  # Remove Analytics Tables

  This migration removes all analytics-related tables and views that are no longer needed.
*/

DROP VIEW IF EXISTS monthly_users;
DROP TABLE IF EXISTS page_views;