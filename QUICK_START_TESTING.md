# 🚀 Quick Start: Testing Persistent Storage

## Step-by-Step Testing Guide

### 1. Open Your App
Your dev server should be running. Open: `http://localhost:5173`

### 2. Open Browser Console
Press **F12** to open DevTools, then click the **Console** tab.

You should see these messages when the app loads:
```
📍 TripContext: Loading trips from localStorage...
📍 TripContext: No trips found in localStorage (or Found X trip(s))
✈️ TripContext: No active trip found (or Found active trip)
📖 StoryContext: Loading stories from localStorage...
📖 StoryContext: No stories found in localStorage (or Found X story/stories)
```

### 3. Create a Test Trip

1. Click **"Trip Creator"** in the navigation
2. Fill in the form:
   - **Destination**: Goa, India
   - **Start Date**: Pick tomorrow
   - **End Date**: Pick next week
   - **Travel Type**: Couple
   - **Travelers**: 2
3. Click **"Create Trip"**

**Watch the console!** You should see:
```
💾 TripContext: Saving 1 trip(s) to localStorage
```

### 4. Test Persistence

1. **Refresh the page** (Press F5)
2. **Watch the console** - you should see:
   ```
   📍 TripContext: Loading trips from localStorage...
   📍 TripContext: Found 1 trip(s)
   ✈️ TripContext: Found active trip
   ```
3. ✅ **Success!** Your trip persisted!

### 5. Verify in DevTools

1. In DevTools, click the **Application** tab (Chrome) or **Storage** tab (Firefox)
2. In the left sidebar, expand **Local Storage**
3. Click on `http://localhost:5173`
4. You should see:
   - `aiTripPlanner_trips` - Contains your trip data
   - `aiTripPlanner_activeTrip` - Contains the selected trip

### 6. Create a Test Story

1. Go to **Smart Tools** → **Trip Story Creator**
2. Add some content:
   - **Title**: My Test Story
   - **Story**: This is a test to verify persistence
3. Click **"Generate Story with AI"** (optional)
4. Click **"Save Story"**

**Watch the console!** You should see:
```
💾 StoryContext: Saving 1 story/stories to localStorage
```

### 7. Test Story Persistence

1. **Refresh the page** (F5)
2. Go to **Saved Info** → **Stories** tab
3. ✅ Your story should be there!

### 8. Alternative Test: Use Test Page

If the main app isn't working, use the test page:

1. Open: `http://localhost:5173/test-storage.html`
2. Click **"Check Support"** - should show ✅
3. Click **"Create Test Trip"**
4. Click **"View Trips"** - should show your trip
5. **Refresh the page** (F5)
6. Click **"View Trips"** again
7. ✅ Trip should still be there!

## Troubleshooting

### ❌ No Console Messages?
**Problem**: Contexts not loading
**Solution**: 
- Check `App.jsx` has `TripProvider` and `StoryProvider`
- Hard refresh: `Ctrl + Shift + R`

### ❌ Data Disappears on Refresh?
**Problem**: localStorage not persisting
**Solution**:
1. Check if in **Private/Incognito mode** (data won't persist)
2. Check browser settings - "Clear on exit" should be OFF
3. Try the test page to isolate the issue

### ❌ Console Shows Errors?
**Problem**: Code issue
**Solution**:
- Copy the error message
- Check `DEBUGGING_STORAGE.md` for solutions
- Look for red errors in console

### ❌ "QuotaExceededError"?
**Problem**: Storage full
**Solution**:
```javascript
// In console
localStorage.clear();
```

## What You Should See

### On First Load (No Data)
```
📍 TripContext: Loading trips from localStorage...
📍 TripContext: No trips found in localStorage
✈️ TripContext: No active trip found
📖 StoryContext: Loading stories from localStorage...
📖 StoryContext: No stories found in localStorage
```

### After Creating a Trip
```
💾 TripContext: Saving 1 trip(s) to localStorage
```

### On Refresh (With Data)
```
📍 TripContext: Loading trips from localStorage...
📍 TripContext: Found 1 trip(s)
✈️ TripContext: Found active trip
📖 StoryContext: Loading stories from localStorage...
📖 StoryContext: No stories found in localStorage
```

### After Creating a Story
```
💾 StoryContext: Saving 1 story/stories to localStorage
```

## Quick Diagnostic

Run this in the console to check everything:

```javascript
// Check if localStorage works
console.log('localStorage supported:', typeof Storage !== 'undefined');

// Check FinalTrip data
console.log('Trips:', localStorage.getItem('aiTripPlanner_trips'));
console.log('Stories:', localStorage.getItem('aiTripPlanner_stories'));
console.log('Active Trip:', localStorage.getItem('aiTripPlanner_activeTrip'));
```

## Success Criteria

✅ Console shows loading messages on page load
✅ Console shows saving messages when creating trips/stories
✅ Data appears in DevTools → Application → Local Storage
✅ Data persists after refresh
✅ No red errors in console

## Next Steps

Once persistence is working:
1. Create multiple trips
2. Create stories for each trip
3. Test editing and deleting
4. Verify everything persists across refreshes

---

**Need Help?** Check `DEBUGGING_STORAGE.md` for detailed troubleshooting!
