# Testing Persistent Storage

## Quick Test Guide

Follow these steps to verify that persistent storage is working correctly:

### Test 1: Create and Persist a Trip

1. **Open the app** in your browser (should be running on `http://localhost:5173`)
2. **Navigate to "Trip Creator"**
3. **Create a new trip**:
   - Destination: "Goa, India"
   - Start Date: Tomorrow
   - End Date: 3 days from now
   - Travel Type: Couple
   - Travelers: 2
4. **Click "Create Trip"**
5. **Refresh the page** (F5 or Ctrl+R)
6. ✅ **Verify**: The trip should still be there and selected

### Test 2: Create and Persist a Story

1. **With a trip selected**, go to "Smart Tools" → "Trip Story Creator"
2. **Add a story**:
   - Title: "My Test Story"
   - Text: "This is a test story to verify persistence"
3. **Click "Generate Story with AI"** (optional)
4. **Click "Save Story"**
5. **Navigate to "Saved Info"**
6. **Click the "Stories" tab**
7. ✅ **Verify**: Your story should appear in the list

### Test 3: Verify Persistence After Refresh

1. **Refresh the page** (F5 or Ctrl+R)
2. **Go to "Saved Info"**
3. ✅ **Verify Trips**: All trips are still there
4. ✅ **Verify Stories**: All stories are still there
5. ✅ **Verify Active Trip**: The selected trip is still active

### Test 4: Edit and Update a Story

1. **Go to "Saved Info" → "Stories" tab**
2. **Click "View Story"** on any story
3. **Edit the content**
4. **Click "Save Story"**
5. **Go back to "Saved Info" → "Stories"**
6. ✅ **Verify**: Changes are reflected
7. **Refresh the page**
8. ✅ **Verify**: Changes persisted

### Test 5: Delete and Verify

1. **Go to "Saved Info" → "Stories" tab**
2. **Click "Delete"** on a story
3. **Confirm deletion**
4. ✅ **Verify**: Story is removed
5. **Refresh the page**
6. ✅ **Verify**: Story is still gone (deletion persisted)

### Test 6: Multiple Trips and Stories

1. **Create 3 different trips**
2. **For each trip, create a story**
3. **Switch between trips**
4. **Refresh the page**
5. ✅ **Verify**: All trips and stories persist
6. ✅ **Verify**: Stories are correctly linked to their trips

### Test 7: Browser Storage Inspection

1. **Open browser DevTools** (F12)
2. **Go to "Application" tab** (Chrome) or "Storage" tab (Firefox)
3. **Click "Local Storage" → your domain**
4. ✅ **Verify**: You should see:
   - `aiTripPlanner_trips` - Array of trips
   - `aiTripPlanner_activeTrip` - Currently selected trip
   - `aiTripPlanner_stories` - Array of stories

### Test 8: Image Persistence

1. **Create a story with an image**:
   - Upload an image (< 5MB)
   - Save the story
2. **Refresh the page**
3. **View the story**
4. ✅ **Verify**: Image is still there

### Test 9: Cross-Tab Sync

1. **Open the app in two browser tabs**
2. **In Tab 1**: Create a new trip
3. **In Tab 2**: Refresh the page
4. ✅ **Verify**: New trip appears in Tab 2
5. **Note**: Real-time sync requires additional implementation

### Test 10: Data Integrity

1. **Create multiple trips with various data**:
   - Different destinations
   - Different dates
   - Different travel types
   - Day plans
   - Stories
2. **Refresh multiple times**
3. **Navigate between pages**
4. ✅ **Verify**: All data remains intact and correct

## Expected Results

### ✅ Success Indicators
- Trips persist after refresh
- Stories persist after refresh
- Active trip selection persists
- Images in stories persist
- Edits and updates persist
- Deletions persist
- No data loss on navigation
- No console errors

### ❌ Failure Indicators
- Data disappears after refresh
- Stories not showing in Saved Info
- Console errors about context
- Images not loading
- Active trip resets
- localStorage errors

## Troubleshooting

### If tests fail:

1. **Check browser console** for errors
2. **Verify localStorage is enabled**:
   ```javascript
   // Run in console
   typeof Storage !== 'undefined'
   // Should return: true
   ```
3. **Check if in private/incognito mode**
4. **Clear cache and try again**
5. **Check localStorage data**:
   ```javascript
   // Run in console
   console.log(localStorage.getItem('aiTripPlanner_trips'));
   console.log(localStorage.getItem('aiTripPlanner_stories'));
   ```

## Manual Testing Checklist

- [ ] Create trip → Refresh → Trip persists
- [ ] Create story → Refresh → Story persists
- [ ] Edit story → Refresh → Edits persist
- [ ] Delete story → Refresh → Deletion persists
- [ ] Upload image → Refresh → Image persists
- [ ] Switch trips → Refresh → Active trip persists
- [ ] Multiple trips → All persist correctly
- [ ] Multiple stories → All persist correctly
- [ ] No console errors
- [ ] localStorage contains correct data

## Automated Test (Optional)

Run this in the browser console to verify localStorage:

```javascript
// Check if storage is working
function testStorage() {
  const trips = JSON.parse(localStorage.getItem('aiTripPlanner_trips') || '[]');
  const stories = JSON.parse(localStorage.getItem('aiTripPlanner_stories') || '[]');
  const activeTrip = JSON.parse(localStorage.getItem('aiTripPlanner_activeTrip') || 'null');
  
  console.log('=== Storage Test Results ===');
  console.log(`Trips: ${trips.length} found`);
  console.log(`Stories: ${stories.length} found`);
  console.log(`Active Trip: ${activeTrip ? 'Set' : 'Not set'}`);
  console.log('===========================');
  
  if (trips.length > 0) {
    console.log('Sample Trip:', trips[0]);
  }
  if (stories.length > 0) {
    console.log('Sample Story:', stories[0]);
  }
}

testStorage();
```

## Success Criteria

All tests should pass with:
- ✅ No data loss
- ✅ No console errors
- ✅ Smooth user experience
- ✅ Fast load times
- ✅ Correct data relationships

---

**Last Updated**: 2024-12-15
**Status**: Ready for Testing
