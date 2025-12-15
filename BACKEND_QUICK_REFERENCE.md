# 🎯 Backend Quick Reference

## Current Status

✅ **Backend architecture is READY**
✅ **Running in LOCAL mode** (localStorage)
✅ **Supabase support available** (optional)

---

## Quick Commands

### Check Current Mode
```javascript
import { getBackendMode } from './services';
console.log(getBackendMode()); // 'local' or 'supabase'
```

### Use Services
```javascript
import { tripService, storyService, authService } from './services';

// Get trips (works in both modes)
const { trips } = await tripService.getTrips();

// Create trip (works in both modes)
const { trip } = await tripService.createTrip(tripData);
```

---

## Environment Variables

### LOCAL Mode (Current)
```env
VITE_BACKEND_MODE=local
```

### SUPABASE Mode (Optional)
```env
VITE_BACKEND_MODE=supabase
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## File Structure

```
src/
├── config/
│   └── supabase.js          ← Supabase client
├── services/
│   ├── authService.js       ← Authentication
│   ├── tripService.js       ← Trip operations
│   ├── storyService.js      ← Story operations
│   └── index.js             ← Exports
```

---

## Service APIs

### Auth
```javascript
authService.signUp(email, password)
authService.signIn(email, password)
authService.signOut()
authService.getCurrentUser()
```

### Trips
```javascript
tripService.getTrips()
tripService.getTrip(id)
tripService.createTrip(data)
tripService.updateTrip(id, updates)
tripService.deleteTrip(id)
```

### Stories
```javascript
storyService.getStories()
storyService.getStoriesByTripId(tripId)
storyService.createStory(data)
storyService.updateStory(id, updates)
storyService.deleteStory(id)
```

---

## Switch to Supabase

1. Create Supabase project at [supabase.com](https://supabase.com)
2. Run `supabase-schema.sql` in SQL Editor
3. Get API credentials from Project Settings
4. Update `.env`:
   ```env
   VITE_BACKEND_MODE=supabase
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   ```
5. Restart: `npm run dev`

---

## Benefits

### LOCAL Mode
- ✅ No setup required
- ✅ Works offline
- ✅ Fast and simple
- ✅ No costs

### SUPABASE Mode
- ✅ User authentication
- ✅ Cloud sync
- ✅ Cross-device access
- ✅ Data backup
- ✅ Image storage

---

## Documentation

- **Full Guide**: `BACKEND_SETUP_GUIDE.md`
- **Database Schema**: `supabase-schema.sql`
- **Environment Template**: `.env.example`

---

**Current Mode**: LOCAL (localStorage)
**Ready for**: Production use
**Optional**: Supabase upgrade available anytime
