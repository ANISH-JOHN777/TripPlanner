# TripContext Documentation

## Overview

The `TripContext` provides global state management for the AI Trip Planner application using React Context API. It manages all trips and the currently active trip with automatic localStorage persistence.

## Setup

The TripContext is already set up in `App.jsx`:

```jsx
import { TripProvider } from './context/TripContext';

function App() {
  return (
    <TripProvider>
      {/* Your app components */}
    </TripProvider>
  );
}
```

## Usage

Import and use the context in any component:

```jsx
import { useTripContext } from '../context/TripContext';

function MyComponent() {
  const { trips, activeTrip, createTrip, selectTrip, updateActiveTrip } = useTripContext();
  
  // Use the context...
}
```

## State

### `trips: Array<Trip>`
Array of all created trips.

```jsx
const { trips } = useTripContext();
console.log(trips); // [{ id: 'trip_123...', destination: 'Paris', ... }, ...]
```

### `activeTrip: Trip | null`
The currently selected/active trip. Can be `null` if no trip is selected.

```jsx
const { activeTrip } = useTripContext();

if (activeTrip) {
  console.log('Active trip:', activeTrip.destination);
} else {
  console.log('No active trip');
}
```

### `loading: boolean`
Loading state for async operations.

```jsx
const { loading, setLoading } = useTripContext();

if (loading) {
  return <LoadingSpinner />;
}
```

## Core Functions

### `createTrip(tripData)`

Creates a new trip and adds it to the trips array. Automatically sets it as the active trip.

**Parameters:**
- `tripData` (Object): The trip data to create

**Returns:** The created trip with auto-generated ID and timestamps

**Auto-generated fields:**
- `id`: Unique identifier (format: `trip_timestamp_random`)
- `createdAt`: ISO timestamp
- `updatedAt`: ISO timestamp

**Example:**

```jsx
const { createTrip } = useTripContext();

const handleCreate = () => {
  const newTrip = createTrip({
    destination: 'Paris, France',
    startDate: '2024-06-01',
    endDate: '2024-06-07',
    budget: 'moderate',
    travelers: 2,
    interests: ['Culture', 'Food', 'History'],
    accommodation: 'hotel',
    transportation: 'flight',
    status: 'planned',
    itinerary: { /* AI-generated data */ },
  });
  
  console.log(newTrip.id); // 'trip_1702545600000_abc123'
};
```

### `selectTrip(tripId)`

Selects a trip by ID and sets it as the active trip.

**Parameters:**
- `tripId` (string | null): The ID of the trip to select, or `null` to clear selection

**Returns:** The selected trip or `null` if not found

**Example:**

```jsx
const { selectTrip, trips } = useTripContext();

// Select a trip
const handleSelect = (id) => {
  const trip = selectTrip(id);
  if (trip) {
    console.log('Selected:', trip.destination);
  } else {
    console.log('Trip not found');
  }
};

// Clear selection
const handleClear = () => {
  selectTrip(null);
};
```

### `updateActiveTrip(updates)`

Updates the active trip with new data. Updates both the `activeTrip` state and the trip in the `trips` array.

**Parameters:**
- `updates` (Object): The updates to apply to the active trip

**Returns:** The updated trip or `null` if no active trip exists

**Auto-updated fields:**
- `updatedAt`: ISO timestamp

**Example:**

```jsx
const { activeTrip, updateActiveTrip } = useTripContext();

const handleUpdateStatus = () => {
  if (!activeTrip) {
    console.warn('No active trip to update');
    return;
  }
  
  const updated = updateActiveTrip({
    status: 'ongoing',
  });
  
  console.log('Updated:', updated);
};

const handleAddNote = () => {
  if (activeTrip) {
    updateActiveTrip({
      notes: 'Remember to book restaurant!',
    });
  }
};
```

## Utility Functions

### `deleteTrip(tripId)`

Deletes a trip by ID. If the deleted trip is the active trip, clears the active trip.

```jsx
const { deleteTrip } = useTripContext();

const handleDelete = (id) => {
  if (window.confirm('Delete this trip?')) {
    deleteTrip(id);
  }
};
```

### `getTripById(tripId)`

Gets a trip by ID without selecting it.

```jsx
const { getTripById } = useTripContext();

const trip = getTripById('trip_123...');
if (trip) {
  console.log(trip.destination);
}
```

### `clearActiveTrip()`

Clears the active trip selection.

```jsx
const { clearActiveTrip } = useTripContext();

clearActiveTrip();
```

### `clearAllTrips()`

Clears all trips and the active trip. Also removes data from localStorage.

```jsx
const { clearAllTrips } = useTripContext();

const handleReset = () => {
  if (window.confirm('Delete all trips?')) {
    clearAllTrips();
  }
};
```

## Trip Object Structure

```typescript
interface Trip {
  // Auto-generated
  id: string;                    // 'trip_timestamp_random'
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp
  
  // Required fields
  destination: string;           // e.g., 'Paris, France'
  startDate: string;             // ISO date string
  endDate: string;               // ISO date string
  budget: string;                // 'budget' | 'moderate' | 'luxury'
  travelers: number;             // Number of travelers
  interests: string[];           // e.g., ['Culture', 'Food']
  accommodation: string;         // 'hotel' | 'hostel' | 'airbnb' | 'resort'
  transportation: string;        // 'flight' | 'train' | 'car' | 'bus'
  status: string;                // 'planned' | 'ongoing' | 'completed'
  
  // Optional fields
  itinerary?: {
    summary: string;
    dailyItinerary: Array<{
      day: number;
      date: string;
      activities: Array<{
        time: string;
        title: string;
        description: string;
        duration: string;
        cost: string;
      }>;
    }>;
    hotels: Array<{
      name: string;
      rating: number;
      pricePerNight: string;
      amenities: string[];
      location: string;
    }>;
    budgetBreakdown: {
      accommodation: string;
      food: string;
      activities: string;
      transportation: string;
      total: string;
    };
    tips: string[];
  };
  
  // Any other custom fields
  [key: string]: any;
}
```

## LocalStorage Persistence

The TripContext automatically persists data to localStorage:

- **Key:** `aiTripPlanner_trips` - Stores the trips array
- **Key:** `aiTripPlanner_activeTrip` - Stores the active trip

Data is:
- **Loaded** on app initialization
- **Saved** automatically when trips or activeTrip changes
- **Cleared** when using `clearAllTrips()`

## Error Handling

The TripContext is designed to be safe and never break the app:

1. **Safe Initialization**: If localStorage data is corrupted, initializes with empty state
2. **Null Checks**: All functions check for null/undefined before operations
3. **Console Warnings**: Invalid operations log warnings instead of throwing errors
4. **Try-Catch**: All localStorage operations are wrapped in try-catch blocks

### Safe Usage Pattern

Always check if `activeTrip` exists before using it:

```jsx
const { activeTrip, updateActiveTrip } = useTripContext();

// ✅ GOOD - Safe
if (activeTrip) {
  updateActiveTrip({ status: 'ongoing' });
}

// ❌ BAD - Could cause issues
updateActiveTrip({ status: 'ongoing' }); // What if activeTrip is null?

// ✅ GOOD - With optional chaining
const destination = activeTrip?.destination || 'No destination';
```

## Common Patterns

### Creating and Navigating to a Trip

```jsx
const { createTrip } = useTripContext();

const handleSaveTrip = () => {
  const trip = createTrip(tripData);
  // Trip is automatically set as active
  navigate('/trips'); // or onNavigate('trips')
};
```

### Displaying All Trips with Active Indicator

```jsx
const { trips, activeTrip, selectTrip } = useTripContext();

return (
  <div>
    {trips.map(trip => (
      <div 
        key={trip.id}
        onClick={() => selectTrip(trip.id)}
        className={activeTrip?.id === trip.id ? 'active' : ''}
      >
        {trip.destination}
        {activeTrip?.id === trip.id && ' ✓'}
      </div>
    ))}
  </div>
);
```

### Updating Trip Status

```jsx
const { activeTrip, updateActiveTrip } = useTripContext();

const markAsCompleted = () => {
  if (activeTrip) {
    updateActiveTrip({ status: 'completed' });
  }
};
```

### Filtering Trips

```jsx
const { trips } = useTripContext();

const plannedTrips = trips.filter(t => t.status === 'planned');
const ongoingTrips = trips.filter(t => t.status === 'ongoing');
const completedTrips = trips.filter(t => t.status === 'completed');
```

## Testing

For testing or development, you can use the utility functions:

```jsx
const { clearAllTrips, createTrip } = useTripContext();

// Reset everything
clearAllTrips();

// Create test data
createTrip({ destination: 'Test 1', /* ... */ });
createTrip({ destination: 'Test 2', /* ... */ });
```

## Migration from Old API

If you were using the old API, here's how to migrate:

```jsx
// OLD API
const { addTrip, setCurrentTrip, updateTrip } = useTripContext();
const trip = addTrip(data);
setCurrentTrip(trip);
updateTrip(trip.id, updates);

// NEW API
const { createTrip, selectTrip, updateActiveTrip } = useTripContext();
const trip = createTrip(data); // Automatically sets as active
// selectTrip(trip.id); // Not needed, already active
updateActiveTrip(updates); // Updates the active trip
```

## Complete Example

See `TripContext.examples.jsx` for comprehensive usage examples.

---

**Questions or Issues?**

Check the examples file or review the TripContext.jsx source code for implementation details.
