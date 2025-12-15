# 🔧 FIX: 400 Error When Saving Activities

## The Error

```
400 Bad Request when updating trip
❌ Error updating trip in Supabase
```

This means the database schema doesn't match what the code expects.

---

## ✅ SOLUTION: Run Corrected Schema

### Step 1: Check Current Schema

1. **Go to**: https://supabase.com/dashboard/project/eqmavypjandxhuwipnyz
2. **Click**: Table Editor → trips
3. **Check columns** - Do you see `day_plans` column?

**If NO `day_plans` column** → Schema not run correctly

### Step 2: Drop Old Tables

1. **Click**: SQL Editor
2. **Run this**:
```sql
DROP TABLE IF EXISTS public.stories CASCADE;
DROP TABLE IF EXISTS public.day_plans CASCADE;
DROP TABLE IF EXISTS public.trips CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
```

3. **Click "Run"**

### Step 3: Run Corrected Schema

1. **Open file**: `supabase-schema-corrected.sql`
2. **Copy ALL** (Ctrl+A, Ctrl+C)
3. **Paste** in SQL Editor
4. **Click "Run"**
5. **Wait** for success

### Step 4: Verify Schema

1. **Go to**: Table Editor → trips
2. **Check these columns exist**:
   - id (uuid)
   - user_id (uuid)
   - destination (text)
   - start_date (date)
   - end_date (date)
   - travel_type (text)
   - travelers (integer)
   - status (text)
   - **day_plans (jsonb)** ← MUST HAVE THIS!
   - created_at (timestamptz)
   - updated_at (timestamptz)

**If `day_plans` column exists** → Schema is correct! ✅

---

## 🧪 After Running Schema

### Step 1: Delete Old Data

1. **Table Editor** → users
2. **Delete all rows** (if any)

### Step 2: Sign Up Again

1. **Refresh app** (F5)
2. **Go to**: /auth
3. **Sign up** with new account
4. **Create trip**
5. **Add activity** → Should work! ✅

---

## 📊 What the Schema Does

### Creates Correct Structure:

**trips table:**
- Stores trip basic info
- **day_plans as JSONB** - Stores all activities for all days
- No separate day_plans table

**Example day_plans data:**
```json
{
  "day1": [
    {
      "id": "activity_123",
      "place": "Beach Visit",
      "time": "09:00",
      "notes": "Bring sunscreen"
    }
  ],
  "day2": [...]
}
```

---

## ⚠️ Common Issues

### Issue 1: "Column day_plans does not exist"

**Solution**: Run corrected schema (Step 2 & 3 above)

### Issue 2: "Permission denied"

**Solution**: Make sure RLS policies exist (they're in the schema)

### Issue 3: Old data conflicts

**Solution**: Delete old users and trips, start fresh

---

## 🎯 Quick Check

**Run this in SQL Editor to verify:**
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'trips' 
AND column_name = 'day_plans';
```

**Expected result:**
```
column_name | data_type
day_plans   | jsonb
```

**If empty** → day_plans column doesn't exist → Run schema!

---

## 🚀 After Fix

Once schema is correct:

1. ✅ Sign up works
2. ✅ Create trip works
3. ✅ Add activities works
4. ✅ Activities save to day_plans JSONB
5. ✅ Activities show in Overview
6. ✅ Everything persists

---

**Run the corrected schema now!**

**File**: `supabase-schema-corrected.sql`

**After running, refresh app and try again!** ✅
