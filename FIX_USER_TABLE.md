# 🔧 FIX: User Not in Users Table

## The Error

```
insert or update on table "trips" violates foreign key constraint "trips_user_id_fkey"
Key is not present in table "users"
```

**Translation**: You're signed in, but your user profile doesn't exist in the `users` table!

---

## ✅ QUICK FIX

### Step 1: Run Fix Script

1. **Go to**: https://supabase.com/dashboard/project/eqmavypjandxhuwipnyz
2. **Click**: SQL Editor
3. **Open file**: `fix-user-trigger.sql`
4. **Copy ALL** (Ctrl+A, Ctrl+C)
5. **Paste** in SQL Editor
6. **Click "Run"**

### Step 2: Verify

1. **Go to**: Table Editor → users
2. **You should see**: Your user with email
3. **If yes** → Fixed! ✅

### Step 3: Test

1. **Refresh app** (F5)
2. **Create trip**
3. **Should work!** ✅

---

## 🎯 What the Fix Does

1. **Recreates trigger** - Auto-creates user profile on signup
2. **Migrates existing users** - Adds current auth users to users table
3. **Fixes the issue** - You can now create trips!

---

## 🧪 Alternative: Manual Fix

If script doesn't work, do this manually:

### Get Your User ID:

1. **SQL Editor** → Run:
```sql
SELECT id, email FROM auth.users;
```

2. **Copy your user ID**

### Create User Profile:

```sql
INSERT INTO public.users (id, email, name, created_at, updated_at)
VALUES (
    'YOUR_USER_ID_HERE',  -- Paste your ID
    'your@email.com',      -- Your email
    'Your Name',           -- Your name
    NOW(),
    NOW()
);
```

3. **Click "Run"**

---

## ⚠️ Why This Happened

**The trigger didn't fire** when you signed up because:
- Trigger might not have been created
- Or trigger failed silently
- Or schema was run after you signed up

**The fix** creates the trigger AND migrates existing users.

---

## ✅ After Fix

Once fixed:

1. ✅ User exists in users table
2. ✅ Can create trips
3. ✅ Trips link to user_id
4. ✅ RLS policies work
5. ✅ Everything works!

---

**Run `fix-user-trigger.sql` in Supabase SQL Editor now!**

**Then refresh app and create trip!** 🚀
