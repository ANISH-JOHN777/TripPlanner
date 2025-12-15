# 🔧 Fixed Supabase Schema - Quick Setup

## ❌ Error You Encountered

```
Error: Failed to run sql query: ERROR: 42703: column "user_id" does not exist
```

## ✅ Solution

I've created a **fixed schema** that resolves this issue: `supabase-schema-fixed.sql`

---

## 🚀 How to Use the Fixed Schema

### Step 1: Clear Previous Attempts (If Any)

If you already tried running the schema, you might need to clean up:

1. Go to Supabase Dashboard → SQL Editor
2. Run this cleanup script:

```sql
-- Drop tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS public.stories CASCADE;
DROP TABLE IF EXISTS public.day_plans CASCADE;
DROP TABLE IF EXISTS public.trips CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Drop triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop functions
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
```

### Step 2: Run the Fixed Schema

1. **Open the fixed schema file**:
   - File: `supabase-schema-fixed.sql`
   - Location: Your project root

2. **Copy ALL contents** (the entire file)

3. **Go to Supabase Dashboard**:
   - URL: https://supabase.com/dashboard/project/eqmavypjandxhuwipnyz
   - Click "SQL Editor" in left sidebar
   - Click "New query"

4. **Paste and Run**:
   - Paste the entire schema
   - Click "Run" button
   - Wait for "Success. No rows returned"

### Step 3: Verify Tables Created

After running the schema, verify:

1. **Go to Table Editor**
2. **Check these tables exist**:
   - ✅ users
   - ✅ trips
   - ✅ day_plans
   - ✅ stories

3. **Check each table structure**:
   - Click on each table
   - Verify columns are present
   - Check RLS is enabled (shield icon)

### Step 4: Verify Storage Buckets

1. **Go to Storage** in left sidebar
2. **Check buckets exist**:
   - ✅ story-images (public)
   - ✅ avatars (public)

---

## 🔍 What Was Fixed

### The Problem

The original schema had the tables in the wrong order, causing the `trips` table to reference `user_id` before the `users` table was fully created.

### The Solution

The fixed schema:
1. ✅ Creates tables in correct dependency order
2. ✅ Ensures `users` table is fully created before `trips`
3. ✅ Properly references `auth.users` table
4. ✅ Sets up all foreign keys correctly

---

## ✅ After Setup Checklist

Once the schema runs successfully:

- [ ] Tables created (users, trips, day_plans, stories)
- [ ] Storage buckets created (story-images, avatars)
- [ ] RLS enabled on all tables
- [ ] Policies active
- [ ] .env file configured
- [ ] Dev server restarted

---

## 🧪 Test Your Setup

### Test 1: Create a User

1. Go to: http://localhost:5173/auth
2. Sign up with:
   - Email: test@example.com
   - Password: Test123456!
   - Name: Test User
3. Click "Create Account"

### Test 2: Check User in Supabase

1. Go to Supabase Dashboard
2. Click "Authentication" → "Users"
3. Verify your test user appears
4. Go to "Table Editor" → "users"
5. Verify user profile created

### Test 3: Create a Trip

1. After signing in, go to Home
2. Click "Plan Your Trip"
3. Fill in trip details
4. Click "Create Trip"
5. Go to Supabase → "trips" table
6. Verify trip appears with your user_id

---

## 🆘 If You Still Get Errors

### Error: "relation does not exist"
**Solution**: Make sure you ran the cleanup script first, then run the fixed schema

### Error: "permission denied"
**Solution**: You're logged into Supabase with correct account

### Error: "duplicate key value"
**Solution**: Tables already exist, run cleanup script first

### Error: "function does not exist"
**Solution**: Run the entire schema, don't run parts separately

---

## 📊 Schema Structure

The fixed schema creates:

```
auth.users (Supabase built-in)
    ↓
public.users (extends auth.users)
    ↓
public.trips (references users)
    ├─→ public.day_plans (references trips)
    └─→ public.stories (references trips)
```

---

## ✅ Success Indicators

You'll know it worked when:

1. ✅ No errors in SQL Editor
2. ✅ "Success. No rows returned" message
3. ✅ All 4 tables visible in Table Editor
4. ✅ RLS shield icon on all tables
5. ✅ Storage buckets created

---

## 🎯 Next Steps

After successful schema setup:

1. **Restart dev server** (if not already done)
   ```powershell
   # Press Ctrl+C, then:
   npm run dev
   ```

2. **Test authentication** at `/auth`

3. **Create a test trip**

4. **Verify data in Supabase**

---

**File to use**: `supabase-schema-fixed.sql`
**Status**: Ready to run
**Expected time**: 2-3 minutes

**This will work!** 🚀
