# 🔧 Debugging Persistent Storage Issues

## Problem: Data Disappears on Refresh

If your data is disappearing when you refresh the page, follow these steps to diagnose and fix the issue.

## Step 1: Test localStorage Directly

### Option A: Use the Test Page
1. Open your browser
2. Go to: `http://localhost:5173/test-storage.html`
3. Click "Check Support" - should show ✅
4. Click "Create Test Trip"
5. Click "View Trips" - should show your trip
6. **Refresh the page (F5)**
7. Click "View Trips" again
8. ✅ If trip is still there → localStorage works!
9. ❌ If trip is gone → localStorage issue (see below)

### Option B: Use Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Run these commands:

```javascript
// Test if localStorage works
localStorage.setItem('test', 'hello');
console.log(localStorage.getItem('test')); // Should show: hello
localStorage.removeItem('test');

// Create a test trip
const testTrip = {
  id: 'test_123',
  destination: 'Test City',
  startDate: '2024-12-20',
  endDate: '2024-12-25'
};
localStorage.setItem('aiTripPlanner_trips', JSON.stringify([testTrip]));

// Verify it was saved
console.log(JSON.parse(localStorage.getItem('aiTripPlanner_trips')));

// Refresh the page (F5), then run this again:
console.log(JSON.parse(localStorage.getItem('aiTripPlanner_trips')));
// Should still show the trip!
```

## Step 2: Check Browser Settings

### Chrome/Edge
1. Open Settings → Privacy and security
2. Click "Cookies and other site data"
3. Make sure "Block third-party cookies" is OFF
4. Make sure "Clear cookies and site data when you close all windows" is OFF
5. Check if you're in **Incognito/Private mode** (data won't persist)

### Firefox
1. Open Settings → Privacy & Security
2. Under "Cookies and Site Data", click "Manage Data"
3. Search for "localhost"
4. Make sure it's not blocked
5. Check "Delete cookies and site data when Firefox is closed" is OFF

### Safari
1. Preferences → Privacy
2. Uncheck "Block all cookies"
3. Uncheck "Prevent cross-site tracking" (for localhost)

## Step 3: Check DevTools Application Tab

1. Open DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Local Storage** in the left sidebar
4. Click on your domain (http://localhost:5173)
5. You should see these keys:
   - `aiTripPlanner_trips`
   - `aiTripPlanner_activeTrip`
   - `aiTripPlanner_stories`

### If keys are missing:
- Create a trip in your app
- Check if the keys appear
- If they don't appear → Context issue (see Step 4)

### If keys disappear on refresh:
- Browser is clearing storage
- Check browser settings (Step 2)
- Check if in private/incognito mode

## Step 4: Check React Context

### Verify Contexts are Loaded

Open browser console and run:

```javascript
// This should work if contexts are properly set up
window.localStorage.getItem('aiTripPlanner_trips');
```

### Check for Console Errors

1. Open DevTools Console
2. Look for errors like:
   - "useTripContext must be used within a TripProvider"
   - "useStoryContext must be used within a StoryProvider"
   - Any localStorage errors

### If you see context errors:
- Check that `App.jsx` has all providers
- Check provider order (should be: UserProvider → TripProvider → StoryProvider)

## Step 5: Verify Code Implementation

### Check TripContext.jsx

```javascript
// Should have these useEffects:

// 1. Load from localStorage on mount
useEffect(() => {
    const savedTrips = localStorage.getItem(TRIPS_STORAGE_KEY);
    if (savedTrips) {
        setTrips(JSON.parse(savedTrips));
    }
}, []);

// 2. Save to localStorage when trips change
useEffect(() => {
    localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
}, [trips]);
```

### Check StoryContext.jsx

```javascript
// Should have these useEffects:

// 1. Load from localStorage on mount
useEffect(() => {
    const savedStories = localStorage.getItem(STORIES_STORAGE_KEY);
    if (savedStories) {
        setStories(JSON.parse(savedStories));
    }
}, []);

// 2. Save to localStorage when stories change
useEffect(() => {
    localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(stories));
}, [stories]);
```

## Step 6: Manual Fix

If nothing else works, try this manual approach:

### 1. Clear Everything
```javascript
// In browser console
localStorage.clear();
```

### 2. Restart Dev Server
```bash
# In terminal
Ctrl+C  # Stop the server
npm run dev  # Start again
```

### 3. Hard Refresh
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### 4. Create Test Data
1. Create a new trip
2. Open DevTools → Application → Local Storage
3. Verify the trip appears in `aiTripPlanner_trips`
4. Refresh the page
5. Check if trip is still there

## Step 7: Common Issues & Solutions

### Issue: "QuotaExceededError"
**Solution**: Storage is full
```javascript
// Clear old data
localStorage.clear();
// Or remove specific items
localStorage.removeItem('aiTripPlanner_trips');
```

### Issue: Data shows in localStorage but not in app
**Solution**: Context not reading localStorage
- Check useEffect dependencies
- Check if initial state is overriding loaded data
- Add console.logs to verify data is being loaded

### Issue: Data saves but disappears on refresh
**Solution**: Browser is clearing storage
- Check if in private/incognito mode
- Check browser settings for "clear on exit"
- Try a different browser

### Issue: Some data persists, some doesn't
**Solution**: Partial implementation
- Check all contexts have save/load useEffects
- Verify all CRUD operations update state correctly

## Step 8: Enable Debug Logging

Add this to your contexts to see what's happening:

### In TripContext.jsx
```javascript
// After loading from localStorage
useEffect(() => {
    const savedTrips = localStorage.getItem(TRIPS_STORAGE_KEY);
    if (savedTrips) {
        const parsed = JSON.parse(savedTrips);
        console.log('📍 Loaded trips from localStorage:', parsed);
        setTrips(parsed);
    } else {
        console.log('📍 No trips found in localStorage');
    }
}, []);

// After saving to localStorage
useEffect(() => {
    console.log('💾 Saving trips to localStorage:', trips);
    localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
}, [trips]);
```

### In StoryContext.jsx
```javascript
// After loading from localStorage
useEffect(() => {
    const savedStories = localStorage.getItem(STORIES_STORAGE_KEY);
    if (savedStories) {
        const parsed = JSON.parse(savedStories);
        console.log('📖 Loaded stories from localStorage:', parsed);
        setStories(parsed);
    } else {
        console.log('📖 No stories found in localStorage');
    }
}, []);

// After saving to localStorage
useEffect(() => {
    console.log('💾 Saving stories to localStorage:', stories);
    localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(stories));
}, [stories]);
```

## Step 9: Test Checklist

Run through this checklist:

- [ ] localStorage is supported (check test page)
- [ ] Not in private/incognito mode
- [ ] Browser not set to clear data on exit
- [ ] No console errors
- [ ] Contexts are properly wrapped in App.jsx
- [ ] useEffects are present in both contexts
- [ ] Data appears in DevTools → Application → Local Storage
- [ ] Data persists after hard refresh (Ctrl+Shift+R)
- [ ] Test page works correctly

## Step 10: Last Resort

If NOTHING works:

### Option 1: Use SessionStorage (temporary)
Replace `localStorage` with `sessionStorage` in contexts
- Data persists during session only
- Clears when browser closes

### Option 2: Use IndexedDB
More complex but more reliable
- Larger storage capacity
- Better for complex data

### Option 3: Add Cloud Backup
Implement Firebase/Supabase
- Data syncs to cloud
- Works across devices

## Quick Diagnostic Script

Run this in console to get a full diagnostic:

```javascript
function diagnoseStorage() {
    console.log('=== STORAGE DIAGNOSTIC ===\n');
    
    // 1. Check support
    console.log('1. localStorage supported:', typeof Storage !== 'undefined');
    
    // 2. Check if can write
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        console.log('2. Can write to localStorage: YES');
    } catch(e) {
        console.log('2. Can write to localStorage: NO -', e.message);
    }
    
    // 3. Check FinalTrip data
    const trips = localStorage.getItem('aiTripPlanner_trips');
    const stories = localStorage.getItem('aiTripPlanner_stories');
    const activeTrip = localStorage.getItem('aiTripPlanner_activeTrip');
    
    console.log('3. FinalTrip Data:');
    console.log('   - Trips:', trips ? `${JSON.parse(trips).length} found` : 'NONE');
    console.log('   - Stories:', stories ? `${JSON.parse(stories).length} found` : 'NONE');
    console.log('   - Active Trip:', activeTrip ? 'SET' : 'NOT SET');
    
    // 4. Storage usage
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length + key.length;
        }
    }
    console.log('4. Storage used:', (total / 1024).toFixed(2), 'KB');
    
    // 5. Private mode check
    console.log('5. Private mode:', 
        window.navigator.userAgent.includes('Private') ? 'MAYBE' : 'PROBABLY NOT');
    
    console.log('\n=== END DIAGNOSTIC ===');
}

diagnoseStorage();
```

## Need More Help?

1. Run the diagnostic script above
2. Copy the console output
3. Check which test fails
4. Follow the corresponding solution

---

**Remember**: The most common issue is being in **private/incognito mode** or having browser settings that **clear data on exit**!
