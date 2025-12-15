# 🚀 Supabase Setup Instructions

## Your Supabase Credentials

I have your Supabase credentials ready to integrate:

**Project URL**: `eqmavypjandxhuwipnyz`
**Full URL**: `https://eqmavypjandxhuwipnyz.supabase.co`
**Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbWF2eXBqYW5keGh1d2lwbnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NzAyNzMsImV4cCI6MjA4MTM0NjI3M30.on4lxYewfWiu8o8s_ZaE5KvX7EXYGcxFhJM9pwjQ0RA`

---

## 📋 Setup Steps

### Step 1: Create .env File

Since `.env` is protected by gitignore (which is correct for security), you need to create it manually:

**Option A: Using Command Line (Recommended)**
```powershell
# In your project directory
cd "C:\Users\Anish John\OneDrive\Desktop\FinalTrip\FinalTrip"

# Copy the example file
copy .env.example .env

# The file is now created and ready to edit
```

**Option B: Using File Explorer**
1. Open File Explorer
2. Navigate to: `C:\Users\Anish John\OneDrive\Desktop\FinalTrip\FinalTrip`
3. Right-click → New → Text Document
4. Name it: `.env` (make sure to remove .txt extension)

### Step 2: Edit .env File

Open `.env` in your text editor and add these lines:

```env
# Backend Mode
VITE_BACKEND_MODE=supabase

# Supabase Configuration
VITE_SUPABASE_URL=https://eqmavypjandxhuwipnyz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbWF2eXBqYW5keGh1d2lwbnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NzAyNzMsImV4cCI6MjA4MTM0NjI3M30.on4lxYewfWiu8o8s_ZaE5KvX7EXYGcxFhJM9pwjQ0RA

# Optional API Keys (leave empty if not using)
VITE_GEMINI_API_KEY=
VITE_WEATHER_API_KEY=
VITE_GOOGLE_MAPS_API_KEY=
VITE_EXCHANGE_RATE_API_KEY=
```

### Step 3: Set Up Supabase Database

Now you need to create the database tables in your Supabase project:

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `eqmavypjandxhuwipnyz`

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run Database Schema**
   - Open the file: `supabase-schema.sql` in your project
   - Copy ALL the contents
   - Paste into the SQL Editor
   - Click "Run" button

4. **Verify Tables Created**
   - Go to "Table Editor" in left sidebar
   - You should see these tables:
     - ✅ users
     - ✅ trips
     - ✅ day_plans
     - ✅ stories

### Step 4: Create Storage Buckets

1. **Go to Storage**
   - Click "Storage" in left sidebar
   - Click "Create a new bucket"

2. **Create story-images bucket**
   - Name: `story-images`
   - Public bucket: ✅ YES
   - Click "Create bucket"

3. **Create avatars bucket**
   - Name: `avatars`
   - Public bucket: ✅ YES
   - Click "Create bucket"

### Step 5: Restart Dev Server

After creating `.env` file, restart your development server:

```powershell
# Stop the current server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

---

## ✅ Verification

After setup, verify everything works:

### 1. Check Backend Mode
Open browser console and check:
```javascript
// Should log: "supabase"
console.log(import.meta.env.VITE_BACKEND_MODE)
```

### 2. Test Authentication
1. Go to: http://localhost:5173/auth
2. Try to sign up with email/password
3. Check if account is created in Supabase

### 3. Test Data Sync
1. Create a trip
2. Go to Supabase Dashboard → Table Editor → trips
3. Verify your trip appears in the table

---

## 🔧 Quick Setup Script

**Copy and paste this in PowerShell:**

```powershell
# Navigate to project
cd "C:\Users\Anish John\OneDrive\Desktop\FinalTrip\FinalTrip"

# Create .env file
@"
VITE_BACKEND_MODE=supabase
VITE_SUPABASE_URL=https://eqmavypjandxhuwipnyz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbWF2eXBqYW5keGh1d2lwbnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NzAyNzMsImV4cCI6MjA4MTM0NjI3M30.on4lxYewfWiu8o8s_ZaE5KvX7EXYGcxFhJM9pwjQ0RA
VITE_GEMINI_API_KEY=
VITE_WEATHER_API_KEY=
VITE_GOOGLE_MAPS_API_KEY=
VITE_EXCHANGE_RATE_API_KEY=
"@ | Out-File -FilePath .env -Encoding utf8

Write-Host "✅ .env file created successfully!"
Write-Host "📝 Next steps:"
Write-Host "1. Go to Supabase Dashboard"
Write-Host "2. Run supabase-schema.sql in SQL Editor"
Write-Host "3. Create storage buckets (story-images, avatars)"
Write-Host "4. Restart dev server: npm run dev"
```

---

## 📊 What Happens Next

Once you complete these steps:

1. **Backend Mode Active**
   - App will use Supabase instead of localStorage
   - All data saved to cloud database
   - Cross-device sync enabled

2. **Authentication Required**
   - Users must sign up/login
   - Each user has isolated data
   - Secure access control

3. **Data Persistence**
   - Trips saved to `trips` table
   - Day plans saved to `day_plans` table
   - Stories saved to `stories` table
   - Images uploaded to Supabase Storage

4. **Security Active**
   - Row Level Security (RLS) enforced
   - Users can only see their own data
   - Storage policies protect images

---

## 🎯 Current Status

✅ **Supabase Credentials**: Ready
✅ **Database Schema**: Available (`supabase-schema.sql`)
✅ **Frontend Code**: Integrated and ready
✅ **Services**: All configured for Supabase

**Next Action**: Create `.env` file and run database schema!

---

## 🆘 Need Help?

If you encounter any issues:

1. **Check Console**: Look for error messages
2. **Verify .env**: Make sure file exists and has correct values
3. **Check Supabase**: Verify tables and buckets created
4. **Restart Server**: Always restart after changing .env

---

**Ready to go live with Supabase!** 🚀
