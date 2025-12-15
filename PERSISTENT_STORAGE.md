# Persistent Storage System

## Overview
FinalTrip now uses **localStorage** to persist all user data across page refreshes. This means your trips, stories, and all related data will be saved automatically and remain available even after closing the browser.

## What Gets Saved

### 1. **Trips** (via TripContext)
- All trip details (destination, dates, travelers, etc.)
- Day plans and activities
- Bookings and preferences
- Active trip selection

**Storage Key:** `aiTripPlanner_trips`

### 2. **Stories** (via StoryContext)
- Story title and content
- Associated trip information
- Images (as base64 data URLs)
- Creation and update timestamps

**Storage Key:** `aiTripPlanner_stories`

## How It Works

### Automatic Persistence
Data is automatically saved to localStorage whenever you:
- Create a new trip
- Update trip details
- Create or edit a story
- Delete trips or stories

### Automatic Loading
Data is automatically loaded from localStorage when:
- The app starts
- You refresh the page
- You navigate between pages

## Features

### ✅ Trips
- **Create**: New trips are automatically saved
- **Update**: Changes sync immediately to localStorage
- **Delete**: Removed trips are deleted from storage
- **Active Trip**: Your selected trip persists across sessions

### ✅ Stories
- **Create**: Stories are saved independently and linked to trips
- **Update**: Edit stories and changes are saved automatically
- **View**: Access all your stories from the "Saved Info" page
- **Delete**: Remove stories without affecting the trip
- **Images**: Story images are stored as base64 (up to 5MB)

## Usage

### Creating a Trip
1. Go to "Trip Creator"
2. Fill in trip details
3. Click "Create Trip"
4. ✅ Automatically saved to localStorage

### Creating a Story
1. Select a trip (or create one)
2. Go to "Smart Tools" → "Trip Story Creator"
3. Add title, text, and/or image
4. Generate with AI or write manually
5. Click "Save Story"
6. ✅ Saved to both TripContext and StoryContext

### Viewing Saved Stories
1. Go to "Saved Info" page
2. Click "Stories" tab
3. View all your saved stories
4. Click "View Story" to edit
5. Click "Delete" to remove

## Data Structure

### Trip Object
```javascript
{
  id: "trip_1234567890_abc123",
  destination: "Goa, India",
  startDate: "2024-12-20",
  endDate: "2024-12-25",
  travelType: "couple",
  travelers: 2,
  dayPlans: {},
  tripStory: {...},
  createdAt: "2024-12-15T09:00:00.000Z",
  updatedAt: "2024-12-15T09:30:00.000Z"
}
```

### Story Object
```javascript
{
  id: "story_1234567890_xyz789",
  title: "My Amazing Goa Trip",
  content: "Full story content...",
  image: "data:image/jpeg;base64,...",
  tripId: "trip_1234567890_abc123",
  destination: "Goa, India",
  tripDates: {
    start: "2024-12-20",
    end: "2024-12-25"
  },
  travelType: "couple",
  createdAt: "2024-12-15T10:00:00.000Z",
  updatedAt: "2024-12-15T10:30:00.000Z"
}
```

## Storage Limits

### Browser localStorage Limits
- **Chrome/Edge**: ~10MB per domain
- **Firefox**: ~10MB per domain
- **Safari**: ~5MB per domain

### Recommendations
- **Images**: Keep under 5MB each
- **Stories**: Unlimited text, but keep reasonable
- **Trips**: Can store 50+ trips easily

## Clearing Data

### Clear All Trips
```javascript
// From browser console
localStorage.removeItem('aiTripPlanner_trips');
localStorage.removeItem('aiTripPlanner_activeTrip');
```

### Clear All Stories
```javascript
// From browser console
localStorage.removeItem('aiTripPlanner_stories');
```

### Clear Everything
```javascript
// From browser console
localStorage.clear();
```

Or use the Settings page (if implemented) to clear data.

## Benefits

✅ **No Database Required**: Works entirely offline
✅ **Instant Sync**: Changes save immediately
✅ **Privacy**: Data stays on your device
✅ **No Login**: No account needed
✅ **Cross-Tab**: Data syncs across browser tabs
✅ **Persistent**: Survives page refreshes and browser restarts

## Limitations

⚠️ **Device-Specific**: Data doesn't sync across devices
⚠️ **Browser-Specific**: Data doesn't sync across browsers
⚠️ **Clearing Cache**: Clearing browser data will delete trips/stories
⚠️ **Storage Limit**: Limited by browser localStorage quota
⚠️ **No Backup**: Data is not backed up to cloud

## Future Enhancements

### Potential Upgrades
1. **Cloud Sync**: Optional cloud backup with user accounts
2. **Export/Import**: Download data as JSON for backup
3. **IndexedDB**: For larger storage capacity
4. **Compression**: Compress images before storing
5. **Sync Across Devices**: Using Firebase or similar

## Troubleshooting

### Data Not Persisting?
1. Check if localStorage is enabled in browser
2. Check if you're in private/incognito mode
3. Check browser storage quota
4. Try clearing cache and reloading

### Lost Data?
1. Check if browser cache was cleared
2. Check if using different browser/device
3. Check browser console for errors

### Storage Full?
1. Delete old trips/stories
2. Remove large images
3. Clear other website data
4. Use export feature (if available)

## Technical Details

### Context Providers
- **TripProvider**: Manages trips and active trip
- **StoryProvider**: Manages stories independently
- **UserProvider**: Manages user preferences (future)

### Hooks
- `useTripContext()`: Access trip data and functions
- `useStoryContext()`: Access story data and functions

### Functions

#### TripContext
- `createTrip(tripData)`: Create new trip
- `updateActiveTrip(updates)`: Update current trip
- `selectTrip(tripId)`: Set active trip
- `deleteTrip(tripId)`: Delete trip
- `getTripById(tripId)`: Get specific trip

#### StoryContext
- `createStory(storyData)`: Create new story
- `updateStory(storyId, updates)`: Update story
- `deleteStory(storyId)`: Delete story
- `getStoryById(storyId)`: Get specific story
- `getStoriesByTripId(tripId)`: Get all stories for a trip

---

**Note**: This system is designed for personal use and small-scale data. For production apps with many users, consider implementing a proper backend database.
