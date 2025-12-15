# 🚀 Backend Architecture Setup Guide

## Overview

Your AI Trip Planner now has a complete backend architecture that supports **two modes**:

1. **LOCAL MODE** (default) - Uses localStorage, no backend required
2. **SUPABASE MODE** - Uses Supabase for auth, database, and storage

The app seamlessly switches between modes based on configuration, maintaining full functionality in both.

---

## 📁 Project Structure

```
FinalTrip/
├── src/
│   ├── config/
│   │   └── supabase.js          # Supabase client configuration
│   ├── services/
│   │   ├── authService.js       # Authentication service
│   │   ├── tripService.js       # Trip CRUD operations
│   │   ├── storyService.js      # Story CRUD + image upload
│   │   └── index.js             # Service exports
│   └── context/
│       ├── TripContext.jsx      # (existing - uses localStorage)
│       └── StoryContext.jsx     # (existing - uses localStorage)
├── supabase-schema.sql          # Database schema
└── .env.example                 # Environment template
```

---

## 🔧 Setup Instructions

### Step 1: Install Dependencies

The Supabase client should already be installing. Check status:

```bash
npm list @supabase/supabase-js
```

If not installed:
```bash
npm install @supabase/supabase-js
```

### Step 2: Create .env File

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. For **LOCAL MODE** (default), just use:
   ```env
   VITE_BACKEND_MODE=local
   ```

3. For **SUPABASE MODE**, you'll need:
   ```env
   VITE_BACKEND_MODE=supabase
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

### Step 3: Set Up Supabase (Optional)

Only needed if you want to use Supabase mode:

#### A. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project
4. Wait for setup to complete (~2 minutes)

#### B. Get API Credentials

1. Go to Project Settings → API
2. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`
3. Add to your `.env` file

#### C. Run Database Schema

1. Open Supabase Dashboard → SQL Editor
2. Open `supabase-schema.sql` from your project
3. Copy and paste the entire file
4. Click "Run"
5. Wait for completion (~30 seconds)

#### D. Create Storage Bucket

1. Go to Storage → Create bucket
2. Name: `story-images`
3. Public: ✅ Yes
4. Click Create

#### E. Set Storage Policies

Run this in SQL Editor:
```sql
CREATE POLICY "Users can upload own story images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'story-images' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can view story images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'story-images');

CREATE POLICY "Users can delete own story images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'story-images' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );
```

---

## 🎯 How It Works

### Backend Mode Detection

The app automatically detects which mode to use:

```javascript
import { isBackendAvailable, getBackendMode } from './config/supabase';

// Check current mode
const mode = getBackendMode(); // 'local' or 'supabase'

// Check if backend is available
if (isBackendAvailable()) {
    // Use Supabase
} else {
    // Use localStorage
}
```

### Service Layer Architecture

All services have the same API regardless of mode:

```javascript
import { tripService } from './services';

// Works in both LOCAL and SUPABASE modes
const { trips, error } = await tripService.getTrips();
const { trip, error } = await tripService.createTrip(tripData);
const { trip, error } = await tripService.updateTrip(id, updates);
const { error } = await tripService.deleteTrip(id);
```

---

## 📚 Service APIs

### Auth Service

```javascript
import { authService } from './services';

// Sign up
const { user, session, error } = await authService.signUp(email, password, metadata);

// Sign in
const { user, session, error } = await authService.signIn(email, password);

// Sign out
const { error } = await authService.signOut();

// Get current user
const { user, error } = await authService.getCurrentUser();

// Update user
const { user, error } = await authService.updateUser(updates);

// Reset password
const { error } = await authService.resetPassword(email);

// Listen to auth changes
const { data } = authService.onAuthStateChange((event, session) => {
    console.log('Auth changed:', event, session);
});
```

### Trip Service

```javascript
import { tripService } from './services';

// Get all trips
const { trips, error } = await tripService.getTrips();

// Get single trip
const { trip, error } = await tripService.getTrip(tripId);

// Create trip
const { trip, error } = await tripService.createTrip({
    destination: 'Goa, India',
    start_date: '2024-12-20',
    end_date: '2024-12-25',
    travel_type: 'couple',
    travelers: 2
});

// Update trip
const { trip, error } = await tripService.updateTrip(tripId, {
    travelers: 3
});

// Delete trip
const { error } = await tripService.deleteTrip(tripId);

// Get/Set active trip
const { trip, error } = await tripService.getActiveTrip();
const { error } = await tripService.setActiveTrip(tripId);
```

### Story Service

```javascript
import { storyService } from './services';

// Get all stories
const { stories, error } = await storyService.getStories();

// Get stories for a trip
const { stories, error } = await storyService.getStoriesByTripId(tripId);

// Get single story
const { story, error } = await storyService.getStory(storyId);

// Create story
const { story, error } = await storyService.createStory({
    title: 'My Trip',
    content: 'Amazing experience...',
    image: base64Image, // Will be uploaded to Supabase Storage
    trip_id: tripId,
    destination: 'Goa, India'
});

// Update story
const { story, error } = await storyService.updateStory(storyId, {
    title: 'Updated Title'
});

// Delete story
const { error } = await storyService.deleteStory(storyId);
```

---

## 🔄 Migration Path

### Current State (LOCAL MODE)
- ✅ Everything works with localStorage
- ✅ No backend required
- ✅ Data persists on device

### Future State (SUPABASE MODE)
- ✅ User authentication
- ✅ Cloud data sync
- ✅ Cross-device access
- ✅ Image storage
- ✅ Data backup

### How to Migrate

**Option 1: Stay Local** (Recommended for now)
- Keep `VITE_BACKEND_MODE=local`
- No changes needed
- Everything continues working

**Option 2: Enable Supabase**
1. Complete Supabase setup (see above)
2. Change `.env`: `VITE_BACKEND_MODE=supabase`
3. Restart dev server
4. Create account in your app
5. Data will now sync to Supabase

**Option 3: Hybrid Approach**
- Use local mode for development
- Use Supabase for production
- Different `.env` files for each environment

---

## 🧪 Testing

### Test LOCAL Mode

1. Ensure `.env` has:
   ```env
   VITE_BACKEND_MODE=local
   ```

2. Restart dev server:
   ```bash
   npm run dev
   ```

3. Check console - should see:
   ```
   📍 Running in LOCAL mode (localStorage)
   ```

4. Create a trip - should work as before

### Test SUPABASE Mode

1. Complete Supabase setup
2. Update `.env`:
   ```env
   VITE_BACKEND_MODE=supabase
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   ```

3. Restart dev server

4. Check console - should see:
   ```
   ✅ Supabase client initialized
   ```

5. Test authentication:
   ```javascript
   import { authService } from './services';
   
   // Sign up
   const { user, error } = await authService.signUp(
       'test@example.com',
       'password123'
   );
   console.log('User:', user);
   ```

---

## 🔐 Security

### Environment Variables
- ✅ Never commit `.env` file
- ✅ Use `.env.example` as template
- ✅ Supabase keys are safe for client-side use
- ✅ RLS policies protect user data

### Row Level Security (RLS)
- ✅ Users can only access their own data
- ✅ Enforced at database level
- ✅ Cannot be bypassed from client

### Storage Security
- ✅ Users can only upload to their own folder
- ✅ Images are publicly readable
- ✅ Only owner can delete

---

## 📊 Database Schema

### Tables

**trips**
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users)
- `destination` (TEXT)
- `start_date` (DATE)
- `end_date` (DATE)
- `travel_type` (TEXT)
- `travelers` (INTEGER)
- `day_plans` (JSONB)
- `bookings` (JSONB)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**stories**
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users)
- `trip_id` (UUID, FK → trips)
- `title` (TEXT)
- `content` (TEXT)
- `image` (TEXT - URL)
- `destination` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**user_preferences**
- `id` (UUID, PK)
- `user_id` (UUID, FK → auth.users)
- `theme` (TEXT)
- `notifications_enabled` (BOOLEAN)
- `active_trip_id` (UUID, FK → trips)
- `settings` (JSONB)

---

## 🚀 Next Steps

### Immediate (Keep LOCAL mode)
1. ✅ Services are ready
2. ✅ App works as before
3. ✅ No changes needed

### When Ready for Supabase
1. Create Supabase project
2. Run database schema
3. Update `.env` file
4. Test authentication
5. Migrate data (if needed)

### Future Enhancements
- Add user profiles
- Implement sharing features
- Add collaborative trips
- Real-time updates
- Push notifications

---

## 📝 Notes

- **LOCAL MODE** is the default and recommended for development
- **SUPABASE MODE** is optional and can be enabled anytime
- Both modes use the same service APIs
- No code changes needed to switch modes
- Data doesn't automatically migrate between modes

---

## 🆘 Troubleshooting

### "Supabase client not initialized"
- Check `.env` file exists
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Restart dev server

### "User not authenticated" errors
- Sign in first using `authService.signIn()`
- Or stay in LOCAL mode

### Services not working
- Check console for errors
- Verify mode: `console.log(getBackendMode())`
- Check if `.env` variables are loaded

---

**Status**: ✅ Backend architecture complete and ready to use!
