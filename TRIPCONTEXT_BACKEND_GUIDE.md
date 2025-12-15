# 🔗 TripContext Backend Integration - Complete Guide

## Overview

The `TripContext` has been updated to integrate with backend services, making the backend the source of truth when authenticated while maintaining localStorage as a fallback.

### Key Features
- ✅ Fetches trips from backend on user login
- ✅ Syncs activeTrip from backend data
- ✅ Backend persistence for all CRUD operations
- ✅ localStorage fallback when offline/unauthenticated
- ✅ Automatic sync of day plans and stories
- ✅ Clean loading and error states
- ✅ Avoids duplicate fetches

---

## 🔧 Import and Usage

```javascript
import { useTripContext } from './context/TripContext';

const MyComponent = () => {
    const {
        trips,
        activeTrip,
        loading,
        error,
        createTrip,
        selectTrip,
        updateActiveTrip,
        deleteTrip,
        syncTrips
    } = useTripContext();

    // Use the context...
};
```

---

## 📊 Available State

### State Variables

```javascript
{
    trips: Array,              // All trips for current user
    activeTrip: Object|null,   // Currently selected trip
    loading: boolean,          // Loading state for operations
    error: Error|null,         // Last error that occurred
    syncing: boolean,          // Syncing state
    backendMode: string,       // 'local' or 'supabase'
    isAuthenticated: boolean   // User authentication status
}
```

---

## 🎯 Available Operations

### 1. Create Trip

```javascript
const createTrip = async (tripData) => {
    // Creates trip in backend and updates local state
    // Automatically sets as active trip
    return newTrip;
};
```

**Example:**
```javascript
const handleCreateTrip = async () => {
    try {
        const newTrip = await createTrip({
            destination: 'Goa, India',
            start_date: '2024-12-20',
            end_date: '2024-12-25',
            travel_type: 'couple',
            travelers: 2
        });

        console.log('Trip created:', newTrip);
        // Automatically set as active trip
    } catch (error) {
        console.error('Failed to create trip:', error);
    }
};
```

### 2. Select Trip

```javascript
const selectTrip = async (tripId) => {
    // Fetches trip if not in local state
    // Sets as active trip in backend and local state
    return trip;
};
```

**Example:**
```javascript
const handleSelectTrip = async (tripId) => {
    const trip = await selectTrip(tripId);
    if (trip) {
        console.log('Trip selected:', trip);
        // Navigate to trip details
    }
};
```

### 3. Update Active Trip

```javascript
const updateActiveTrip = async (updates) => {
    // Updates active trip in backend
    // Updates local state
    return updatedTrip;
};
```

**Example:**
```javascript
const handleUpdateTrip = async () => {
    try {
        const updated = await updateActiveTrip({
            travelers: 3,
            notes: 'Updated notes'
        });

        console.log('Trip updated:', updated);
    } catch (error) {
        console.error('Failed to update trip:', error);
    }
};
```

### 4. Update Specific Trip

```javascript
const updateTrip = async (tripId, updates) => {
    // Updates any trip by ID
    // Updates local state
    return updatedTrip;
};
```

**Example:**
```javascript
const handleUpdateSpecificTrip = async (tripId) => {
    const updated = await updateTrip(tripId, {
        status: 'completed'
    });
};
```

### 5. Delete Trip

```javascript
const deleteTrip = async (tripId) => {
    // Deletes trip from backend
    // Removes from local state
    // Clears active trip if it's the deleted one
};
```

**Example:**
```javascript
const handleDeleteTrip = async (tripId) => {
    if (confirm('Delete this trip?')) {
        try {
            await deleteTrip(tripId);
            console.log('Trip deleted');
        } catch (error) {
            console.error('Failed to delete trip:', error);
        }
    }
};
```

### 6. Load Trips

```javascript
const loadTrips = async () => {
    // Fetches all trips from backend
    // Updates local state
};
```

**Example:**
```javascript
// Called automatically on mount and auth changes
// Can be called manually to refresh
useEffect(() => {
    loadTrips();
}, []);
```

### 7. Sync Trips

```javascript
const syncTrips = async () => {
    // Manually sync trips with backend
    // Useful after external changes
};
```

**Example:**
```javascript
const handleRefresh = async () => {
    await syncTrips();
    console.log('Trips synced');
};
```

### 8. Get Day Plans

```javascript
const getDayPlans = async (tripId) => {
    // Fetches day plans for a trip
    return dayPlans;
};
```

**Example:**
```javascript
const loadDayPlans = async () => {
    const dayPlans = await getDayPlans(activeTrip.id);
    console.log('Day plans:', dayPlans);
};
```

### 9. Get Stories

```javascript
const getStories = async (tripId) => {
    // Fetches stories for a trip
    return stories;
};
```

**Example:**
```javascript
const loadStories = async () => {
    const stories = await getStories(activeTrip.id);
    console.log('Stories:', stories);
};
```

---

## 🔄 Data Flow

### On App Load
```
App starts
    ↓
AuthContext loads
    ↓
TripContext loads
    ↓
Check authentication
    ↓
If authenticated:
  - Fetch trips from backend
  - Load active trip
    ↓
If not authenticated:
  - Load from localStorage
    ↓
Update local state
```

### On User Login
```
User logs in
    ↓
AuthContext updates
    ↓
TripContext detects auth change
    ↓
Fetch trips from backend
    ↓
Sync active trip
    ↓
Update UI
```

### On Create Trip
```
User creates trip
    ↓
createTrip() called
    ↓
Save to backend (tripService)
    ↓
Update local state
    ↓
Set as active trip
    ↓
Update UI
```

### On Update Trip
```
User updates trip
    ↓
updateActiveTrip() called
    ↓
Update in backend
    ↓
Update in trips array
    ↓
Update active trip
    ↓
Update UI
```

### On Delete Trip
```
User deletes trip
    ↓
deleteTrip() called
    ↓
Delete from backend
    ↓
Remove from local state
    ↓
Clear active trip if needed
    ↓
Update UI
```

---

## 💡 Usage Examples

### Example 1: Trip List Component

```javascript
import { useTripContext } from './context/TripContext';

const TripList = () => {
    const { trips, loading, error, selectTrip, deleteTrip } = useTripContext();

    if (loading) return <div>Loading trips...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>My Trips ({trips.length})</h2>
            {trips.map(trip => (
                <div key={trip.id}>
                    <h3>{trip.destination}</h3>
                    <p>{trip.start_date} to {trip.end_date}</p>
                    <button onClick={() => selectTrip(trip.id)}>
                        View
                    </button>
                    <button onClick={() => deleteTrip(trip.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};
```

### Example 2: Create Trip Form

```javascript
import { useTripContext } from './context/TripContext';
import { useState } from 'react';

const CreateTripForm = () => {
    const { createTrip, loading } = useTripContext();
    const [formData, setFormData] = useState({
        destination: '',
        start_date: '',
        end_date: '',
        travel_type: 'solo'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newTrip = await createTrip(formData);
            alert('Trip created!');
            // Navigate to trip details
        } catch (error) {
            alert('Failed to create trip');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Destination"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                required
            />
            <input
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                required
            />
            <input
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Trip'}
            </button>
        </form>
    );
};
```

### Example 3: Trip Details with Day Plans

```javascript
import { useTripContext } from './context/TripContext';
import { useState, useEffect } from 'react';

const TripDetails = () => {
    const { activeTrip, updateActiveTrip, getDayPlans, getStories } = useTripContext();
    const [dayPlans, setDayPlans] = useState([]);
    const [stories, setStories] = useState([]);

    useEffect(() => {
        if (activeTrip) {
            loadTripData();
        }
    }, [activeTrip]);

    const loadTripData = async () => {
        const [plans, tripStories] = await Promise.all([
            getDayPlans(activeTrip.id),
            getStories(activeTrip.id)
        ]);

        setDayPlans(plans);
        setStories(tripStories);
    };

    const handleUpdateNotes = async (notes) => {
        await updateActiveTrip({ notes });
    };

    if (!activeTrip) return <div>No trip selected</div>;

    return (
        <div>
            <h1>{activeTrip.destination}</h1>
            <p>{activeTrip.start_date} to {activeTrip.end_date}</p>
            
            <h2>Day Plans ({dayPlans.length})</h2>
            {dayPlans.map(plan => (
                <div key={plan.id}>
                    Day {plan.day_number}: {plan.activities.length} activities
                </div>
            ))}

            <h2>Stories ({stories.length})</h2>
            {stories.map(story => (
                <div key={story.id}>
                    {story.title}
                </div>
            ))}
        </div>
    );
};
```

### Example 4: Sync Button

```javascript
import { useTripContext } from './context/TripContext';

const SyncButton = () => {
    const { syncTrips, syncing } = useTripContext();

    return (
        <button onClick={syncTrips} disabled={syncing}>
            {syncing ? '🔄 Syncing...' : '🔄 Sync Trips'}
        </button>
    );
};
```

---

## 🔐 Authentication Integration

### Auth State Changes

The TripContext automatically responds to authentication changes:

```javascript
// In TripContext
useEffect(() => {
    loadTrips(); // Automatically reloads when auth changes
}, [isAuthenticated, user]);
```

### Backend Mode Detection

```javascript
const { backendMode, isAuthenticated } = useTripContext();

if (backendMode === 'supabase' && isAuthenticated) {
    // Using backend with authentication
} else {
    // Using localStorage
}
```

---

## ⚡ Performance Optimizations

### 1. Avoid Duplicate Fetches

Trips are loaded automatically on:
- App mount
- User login
- Auth state change

Manual loading is available via `loadTrips()` or `syncTrips()`.

### 2. Local State Caching

Trips are cached in local state. Subsequent operations use cached data when possible.

### 3. Optimistic Updates

Local state is updated immediately, backend sync happens in background.

---

## 🎯 Best Practices

### 1. Handle Loading States

```javascript
const { loading } = useTripContext();

if (loading) {
    return <LoadingSpinner />;
}
```

### 2. Handle Errors

```javascript
const { error } = useTripContext();

if (error) {
    return <ErrorMessage message={error.message} />;
}
```

### 3. Check Active Trip

```javascript
const { activeTrip } = useTripContext();

if (!activeTrip) {
    return <div>Please select a trip</div>;
}
```

### 4. Use Try-Catch

```javascript
try {
    await createTrip(tripData);
} catch (error) {
    console.error('Failed:', error);
    alert('Error creating trip');
}
```

### 5. Sync After External Changes

```javascript
// After bulk operations or external updates
await syncTrips();
```

---

## 🔄 Migration from Old TripContext

### Old Way (localStorage only)
```javascript
const createTrip = (tripData) => {
    const newTrip = {...tripData, id: generateId()};
    setTrips([...trips, newTrip]);
    return newTrip;
};
```

### New Way (Backend integrated)
```javascript
const createTrip = async (tripData) => {
    const { trip, error } = await tripService.createTrip(tripData);
    if (!error) {
        setTrips([...trips, trip]);
        return trip;
    }
};
```

### Key Changes
- ✅ All operations are now `async`
- ✅ Backend is source of truth
- ✅ localStorage is automatic fallback
- ✅ Error handling built-in
- ✅ Loading states managed

---

## 🎉 Summary

The updated TripContext provides:
- ✅ **Seamless backend integration**
- ✅ **Automatic data syncing**
- ✅ **localStorage fallback**
- ✅ **Clean error handling**
- ✅ **Loading states**
- ✅ **Day plans and stories integration**
- ✅ **Authentication awareness**

**Your TripContext is now fully connected to the backend!** 🚀
