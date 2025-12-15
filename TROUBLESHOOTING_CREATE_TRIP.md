# 🔧 Troubleshooting: Create Trip Not Working

## Issue
After signing in, the create trip functionality is not working properly.

## 🔍 Debugging Steps

### Step 1: Check Browser Console

1. **Open Developer Tools**:
   - Press `F12` or `Ctrl+Shift+I` (Windows)
   - Or right-click → "Inspect"

2. **Go to Console tab**

3. **Look for errors** (red text):
   - Authentication errors
   - Database errors
   - Network errors
   - JavaScript errors

4. **Take a screenshot** of any errors you see

### Step 2: Check Network Tab

1. **Open Network tab** in Developer Tools

2. **Try to create a trip**

3. **Look for failed requests** (red status codes):
   - 400 errors (Bad Request)
   - 401 errors (Unauthorized)
   - 403 errors (Forbidden)
   - 500 errors (Server Error)

4. **Click on failed requests** to see details

### Step 3: Verify Authentication

1. **Check if you're logged in**:
   - Open Console
   - Type: `localStorage.getItem('sb-eqmavypjandxhuwipnyz-auth-token')`
   - Should show a token if logged in

2. **Check user data**:
   - In Console, the app should log: "✅ User authenticated"
   - Look for your email in the logs

### Step 4: Check Supabase Connection

1. **Open Console**

2. **Look for these logs**:
   - "🔄 TripContext: Loading trips..."
   - "✅ Loaded X trip(s) from Supabase"
   - "➕ TripContext: Creating trip..."

3. **If you see**:
   - "❌ Error" messages → There's a problem
   - "User not authenticated" → Auth issue
   - "Permission denied" → RLS policy issue

### Step 5: Test in Supabase Dashboard

1. **Go to Supabase Dashboard**:
   ```
   https://supabase.com/dashboard/project/eqmavypjandxhuwipnyz
   ```

2. **Click "Table Editor"** → **"trips" table**

3. **Try to manually insert a row**:
   - Click "Insert row"
   - Fill in:
     - user_id: (your user ID from auth.users)
     - destination: "Test"
     - start_date: Tomorrow
     - end_date: Day after tomorrow
     - travel_type: "solo"
   - Click "Save"

4. **If it fails**:
   - Check RLS policies
   - Check user_id matches your auth user

---

## 🛠️ Common Issues & Fixes

### Issue 1: "User not authenticated"

**Cause**: Not logged in or session expired

**Fix**:
1. Sign out completely
2. Clear browser cache
3. Sign in again
4. Try creating trip

### Issue 2: "Permission denied" or RLS error

**Cause**: Row Level Security blocking the insert

**Fix**:
1. Go to Supabase Dashboard
2. Run this SQL:
```sql
-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'trips';

-- Check policies
SELECT * FROM pg_policies 
WHERE tablename = 'trips';
```

3. If no policies, run `enable-rls.sql` again

### Issue 3: "Column does not exist"

**Cause**: Database schema mismatch

**Fix**:
1. Check what data you're sending
2. Compare with database columns
3. Make sure all required fields are provided:
   - destination
   - start_date
   - end_date
   - travel_type

### Issue 4: Network Error

**Cause**: Can't connect to Supabase

**Fix**:
1. Check internet connection
2. Verify Supabase URL in `.env`:
   ```
   VITE_SUPABASE_URL=https://eqmavypjandxhuwipnyz.supabase.co
   ```
3. Restart dev server

### Issue 5: Nothing happens when clicking "Create Trip"

**Cause**: JavaScript error or form validation issue

**Fix**:
1. Check Console for errors
2. Make sure all form fields are filled
3. Check if button is actually clickable
4. Try refreshing the page

---

## 🧪 Quick Test

### Test 1: Check Backend Mode

Open Console and run:
```javascript
console.log('Backend Mode:', import.meta.env.VITE_BACKEND_MODE);
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
```

**Expected**:
```
Backend Mode: supabase
Supabase URL: https://eqmavypjandxhuwipnyz.supabase.co
```

### Test 2: Check Authentication

Open Console and run:
```javascript
// Check if user is logged in
const { data: { user } } = await supabase.auth.getUser();
console.log('Current User:', user);
```

**Expected**: Should show your user object with email

### Test 3: Manual Trip Creation

Open Console and run:
```javascript
// Try to create a trip manually
const { data, error } = await supabase
  .from('trips')
  .insert([{
    destination: 'Test Trip',
    start_date: '2024-12-20',
    end_date: '2024-12-25',
    travel_type: 'solo',
    travelers: 1
  }])
  .select();

console.log('Result:', data);
console.log('Error:', error);
```

**If successful**: Trip created!
**If error**: Shows what's wrong

---

## 📸 What to Share

If you need help, please share:

1. **Console errors** (screenshot)
2. **Network tab** (failed requests)
3. **What happens** when you click "Create Trip"
4. **Browser** you're using
5. **Any error messages** you see

---

## 🔄 Quick Reset

If nothing works, try this:

1. **Sign out** from the app
2. **Clear browser data**:
   - Press `Ctrl+Shift+Delete`
   - Clear "Cookies and site data"
   - Clear "Cached images and files"
3. **Close browser completely**
4. **Reopen** and go to `http://localhost:5173`
5. **Sign in again**
6. **Try creating a trip**

---

## 📞 Next Steps

1. **Open browser console** (F12)
2. **Try to create a trip**
3. **Look for red errors**
4. **Share the error message** with me

I'll help you fix the specific issue once we see what error is occurring!

---

**Let's debug this together!** 🔍
