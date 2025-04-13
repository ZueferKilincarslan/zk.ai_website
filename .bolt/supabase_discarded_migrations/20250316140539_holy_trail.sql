/*
  # Create initial admin user

  1. Changes
    - Create admin user through direct insert
    - Add user to admin_users table
  
  2. Security
    - Password is temporary and should be changed on first login
    - Uses secure password hashing
*/

-- Create the admin user
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Insert the admin user
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@zk-ai.agency',
    crypt('admin123', gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"name": "Admin"}',
    now(),
    now(),
    encode(gen_random_bytes(32), 'base64'),
    null,
    null,
    null
  )
  RETURNING id INTO new_user_id;

  -- Add the user to admin_users table
  INSERT INTO admin.admin_users (id)
  VALUES (new_user_id)
  ON CONFLICT (id) DO NOTHING;

EXCEPTION
  WHEN unique_violation THEN
    -- If user already exists, try to get their ID
    SELECT id INTO new_user_id
    FROM auth.users
    WHERE email = 'admin@zk-ai.agency';
    
    -- Add to admin_users if not already there
    INSERT INTO admin.admin_users (id)
    VALUES (new_user_id)
    ON CONFLICT (id) DO NOTHING;
END $$;