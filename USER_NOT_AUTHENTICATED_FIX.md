# 🔧 QUICK FIX: User Not Authenticated

## The Error

```
Error: User not authenticated
```

This happens because:
- You're in SUPABASE mode
- You're not signed in
- Trying to create a trip

---

## ✅ SOLUTION OPTIONS

### Option 1: Sign In (Recommended for Production)

1. **Go to**: http://localhost:5173/auth
2. **Sign up** with your email
3. **Check email** for confirmation link
4. **Click link** to confirm
5. **Sign in**
6. **Create trip** - Will work! ✅

### Option 2: Use Guest Mode

1. **Click "Continue as Guest"** on auth page
2. **Uses localStorage** (no authentication needed)
3. **Create trips** immediately
4. **Data saved locally**

### Option 3: Switch to LOCAL Mode Temporarily

1. **Edit `.env`**:
   ```
   VITE_BACKEND_MODE=local
   #VITE_SUPABASE_URL=...
   #VITE_SUPABASE_ANON_KEY=...
   ```

2. **Restart server**:
   ```bash
   Ctrl+C
   npm run dev
   ```

3. **Test without authentication**

---

## 🎯 RECOMMENDED FLOW

### For Testing:

**Use Guest Mode:**
1. Go to /auth
2. Click "Continue as Guest"
3. Test all features
4. Data saved to localStorage

### For Production:

**Use Supabase with Auth:**
1. Sign up
2. Confirm email
3. Sign in
4. Full cloud features

---

## 📝 WHY THIS HAPPENS

**Supabase Mode Requirements:**
- User MUST be authenticated
- Trips are tied to user_id
- RLS (Row Level Security) enforces this
- Can't create trips without user

**Guest Mode:**
- No authentication needed
- Data saved locally
- Works offline
- Perfect for testing

---

## 🚀 QUICK TEST

**Right Now:**

1. **Go to**: http://localhost:5173/auth
2. **Click**: "Continue as Guest" button
3. **Go to**: Create Trip
4. **Fill in** trip details
5. **Create trip** - Works! ✅

---

## 🔐 FOR PRODUCTION

When deploying:

1. **Keep Supabase mode** ON
2. **Users must sign up**
3. **Email confirmation** required
4. **Guest mode** optional (can disable)

---

**Use Guest Mode for quick testing!**

**Or sign up → confirm email → sign in for full features!** ✅
