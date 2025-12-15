# 🔍 Debug Guide - Day Planner Not Working

## Step-by-Step Debugging

### Step 1: Check Console Errors

1. **Open browser**: http://localhost:5173
2. **Press F12** (Developer Tools)
3. **Go to Console tab**
4. **Clear console** (click 🚫 icon)
5. **Go to Day Planner page**
6. **Try to add activity**
7. **Copy ALL console output**

### Step 2: Check What's Happening

Look for these messages in console:

**✅ Good Signs:**
```
💾 Saving day plan: {...}
📝 TripContext: Updating active trip...
📍 LOCAL MODE: Trip updated in localStorage
✅ Trip updated
✅ Day plan saved successfully
```

**❌ Bad Signs:**
```
❌ Error updating trip
❌ Trip not found
⚠️ No active trip to update
User not authenticated
```

### Step 3: Check localStorage

1. **In Developer Tools**, go to **Application** tab
2. **Click "Local Storage"** in left sidebar
3. **Click your site** (http://localhost:5173)
4. **Look for**: `aiTripPlanner_trips`
5. **Click on it** to see the value
6. **Copy the value** and share it

### Step 4: Check Active Trip

In Console tab, run this:
```javascript
// Check if there's an active trip
const activeTrip = JSON.parse(localStorage.getItem('aiTripPlanner_activeTrip'));
console.log('Active Trip:', activeTrip);

// Check all trips
const trips = JSON.parse(localStorage.getItem('aiTripPlanner_trips') || '[]');
console.log('All Trips:', trips);
```

### Step 5: Manual Test

Try adding a day plan manually in console:
```javascript
// Get current trip
const trips = JSON.parse(localStorage.getItem('aiTripPlanner_trips') || '[]');
const trip = trips[0]; // First trip

// Add day plan
trip.dayPlans = {
    day1: [{
        id: 'test_123',
        place: 'Test Activity',
        time: '09:00',
        notes: 'Test notes'
    }]
};

// Save back
localStorage.setItem('aiTripPlanner_trips', JSON.stringify(trips));

// Refresh page
location.reload();
```

---

## Common Issues & Fixes

### Issue 1: No Active Trip

**Symptom**: Console shows "No active trip to update"

**Fix**:
1. Go to Overview page
2. Make sure a trip is selected
3. Try Day Planner again

### Issue 2: Trip ID Mismatch

**Symptom**: Console shows "Trip not found"

**Fix**:
1. Clear localStorage
2. Create a new trip
3. Try adding activity

**Clear localStorage:**
```javascript
localStorage.clear();
location.reload();
```

### Issue 3: Form Not Appearing

**Symptom**: Nothing happens when clicking "+ Add Activity"

**Fix**:
1. Check console for JavaScript errors
2. Make sure dates are set on trip
3. Refresh page

### Issue 4: Form Appears But Won't Submit

**Symptom**: Form shows but "Add Activity" button doesn't work

**Fix**:
1. Fill in required field (Place/Activity)
2. Check console for validation errors
3. Try with just the Place field filled

---

## What to Share

If it's still not working, share:

1. **Console output** (all of it)
2. **localStorage data** (aiTripPlanner_trips value)
3. **What happens** when you click buttons
4. **Any error messages** you see
5. **Screenshots** if possible

---

## Quick Reset

If nothing works, try a complete reset:

```javascript
// Clear all data
localStorage.clear();

// Reload page
location.reload();

// Then:
// 1. Create a new trip
// 2. Go to Day Planner
// 3. Try adding activity
```

---

**Please share the console output so I can see what's failing!** 🔍
