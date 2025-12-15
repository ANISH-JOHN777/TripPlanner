# 🔧 QUICK FIX: Switch to LOCAL Mode

## Problem
Having issues with Supabase authentication and email confirmation.

## ✅ INSTANT SOLUTION: Use LOCAL Mode

This will make your app work immediately without any authentication!

---

## Step 1: Edit .env File

1. **Open file**: `.env` in your project root

2. **Find this line**:
   ```
   VITE_BACKEND_MODE=supabase
   ```

3. **Change it to**:
   ```
   VITE_BACKEND_MODE=local
   ```

4. **Save the file**

## Step 2: Restart Dev Server

1. **In your terminal**, press `Ctrl+C` to stop the server

2. **Run again**:
   ```
   npm run dev
   ```

3. **Wait for it to start**

## Step 3: Test Your App

1. **Open**: http://localhost:5173

2. **Go to Home page**

3. **Click "Plan Your Trip"** or **"Create Trip"**

4. **Fill in trip details**

5. **Click "Create Trip"**

6. **IT WILL WORK!** ✅

---

## 🎯 What LOCAL Mode Does

**LOCAL Mode:**
- ✅ No authentication required
- ✅ No Supabase needed
- ✅ Data saved to browser localStorage
- ✅ Works offline
- ✅ Perfect for development and testing
- ✅ All features work immediately

**Data Storage:**
- Trips saved to: `localStorage`
- Day plans saved to: `localStorage`
- Stories saved to: `localStorage`
- Data persists in your browser

---

## 🔄 Switch Back to Supabase Later

When you want to use Supabase again:

1. **Fix the email confirmation issue** in Supabase
2. **Change .env back**:
   ```
   VITE_BACKEND_MODE=supabase
   ```
3. **Restart server**
4. **Sign in with confirmed email**

---

## ✅ Quick Steps Summary

```bash
# 1. Edit .env file
VITE_BACKEND_MODE=local

# 2. Restart server
Ctrl+C
npm run dev

# 3. Use the app!
# No sign-in needed, everything works!
```

---

## 🎊 Result

After switching to LOCAL mode:

- ✅ App works immediately
- ✅ No authentication errors
- ✅ Can create trips
- ✅ Can add day plans
- ✅ Can create stories
- ✅ All features functional

---

**Do this now and your app will work in 1 minute!** 🚀
