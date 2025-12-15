# 🎯 Auth & Database Quick Reference

## Authentication

### Access Auth Page
```
http://localhost:5173/auth
```

### Use Auth in Components
```javascript
import { useAuth } from './context/AuthContext';

const { user, isAuthenticated, signIn, signOut, loading } = useAuth();
```

### Auth Methods
```javascript
// Sign up
await signUp(email, password, { name: 'John Doe' });

// Sign in
await signIn(email, password);

// Sign out
await signOut();

// Check auth state
if (isAuthenticated) {
    console.log('User:', user.email);
}
```

---

## Database Tables

### 1. users
- id, email, full_name, avatar_url, preferences

### 2. trips
- id, user_id, destination, start_date, end_date, travel_type

### 3. day_plans
- id, trip_id, day_number, day_date, activities (JSONB)

### 4. stories
- id, trip_id, title, story_text, image_url

---

## Services

### Import
```javascript
import { 
    authService, 
    tripService, 
    dayPlanService, 
    storyService 
} from './services';
```

### Trip Operations
```javascript
// Get all trips
const { trips } = await tripService.getTrips();

// Create trip
const { trip } = await tripService.createTrip({
    destination: 'Goa, India',
    start_date: '2024-12-20',
    end_date: '2024-12-25',
    travel_type: 'couple'
});

// Update trip
await tripService.updateTrip(tripId, { travelers: 3 });

// Delete trip
await tripService.deleteTrip(tripId);
```

### Day Plan Operations
```javascript
// Get day plans for trip
const { dayPlans } = await dayPlanService.getDayPlans(tripId);

// Create day plan
const { dayPlan } = await dayPlanService.createDayPlan({
    trip_id: tripId,
    day_number: 1,
    activities: [...]
});

// Add activity
await dayPlanService.addActivity(dayPlanId, {
    time: '09:00',
    title: 'Beach Visit',
    type: 'activity'
});
```

### Story Operations
```javascript
// Get stories for trip
const { stories } = await storyService.getStoriesByTripId(tripId);

// Create story
const { story } = await storyService.createStory({
    trip_id: tripId,
    title: 'My Trip',
    story_text: 'Amazing...',
    image_url: imageUrl
});
```

---

## Setup Supabase

### 1. Create Project
- Go to https://supabase.com
- Create new project
- Wait ~2 minutes

### 2. Run Schema
- Dashboard → SQL Editor
- Paste `supabase-schema.sql`
- Click "Run"

### 3. Get Credentials
- Settings → API
- Copy Project URL
- Copy anon/public key

### 4. Update .env
```env
VITE_BACKEND_MODE=supabase
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

### 5. Restart
```bash
npm run dev
```

---

## Security

### RLS Policies
- ✅ Users can only access their own data
- ✅ Enforced at database level
- ✅ Cannot be bypassed

### Data Isolation
```sql
-- Users can only see their own trips
WHERE user_id = auth.uid()

-- Users can only see day plans for their trips
WHERE trip_id IN (SELECT id FROM trips WHERE user_id = auth.uid())
```

---

## Testing

### Test Auth
1. Go to `/auth`
2. Create account
3. Sign in
4. Refresh page (session persists)
5. Sign out

### Test Data
1. Create trip
2. Create day plan
3. Create story
4. Refresh page
5. Data persists!

---

## Modes

### LOCAL (Current)
- Uses localStorage
- No setup required
- Auth is mocked
- ✅ Works offline

### SUPABASE (Optional)
- Uses cloud database
- Real authentication
- Cross-device sync
- ✅ Production ready

---

## Files

### Auth
- `src/context/AuthContext.jsx`
- `src/pages/Auth.jsx`
- `src/pages/Auth.css`

### Services
- `src/services/authService.js`
- `src/services/tripService.js`
- `src/services/dayPlanService.js`
- `src/services/storyService.js`

### Database
- `supabase-schema.sql`
- `DATABASE_SCHEMA.md`

---

## Quick Commands

### Check Mode
```javascript
import { getBackendMode } from './services';
console.log(getBackendMode()); // 'local' or 'supabase'
```

### Check Auth
```javascript
const { user } = useAuth();
console.log('Logged in:', !!user);
```

### Debug
```javascript
// View localStorage
console.log(localStorage.getItem('aiTripPlanner_trips'));
console.log(localStorage.getItem('mockUser'));
```

---

## Documentation

- **Full Guide**: `AUTH_DATABASE_COMPLETE.md`
- **Schema Docs**: `DATABASE_SCHEMA.md`
- **Backend Setup**: `BACKEND_SETUP_GUIDE.md`

---

**Status**: ✅ Ready to use
**Mode**: LOCAL
**Auth**: `/auth`
**Test**: Create account and start planning!
