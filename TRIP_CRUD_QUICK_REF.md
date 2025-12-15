# 🎯 Trip CRUD Quick Reference

## Import
```javascript
import { tripService } from './services';
```

---

## CREATE Trip
```javascript
const { trip, error } = await tripService.createTrip({
    destination: 'Goa, India',
    start_date: '2024-12-20',
    end_date: '2024-12-25',
    travel_type: 'couple',  // 'solo' | 'couple' | 'group'
    travelers: 2,
    budget: 5000,           // Optional
    notes: 'Anniversary'    // Optional
});
```

---

## READ Trips

### Get All Trips
```javascript
const { trips, error } = await tripService.getTrips();
// Returns: Array of trips for current user
```

### Get Single Trip
```javascript
const { trip, error } = await tripService.getTrip(tripId);
// Returns: Single trip object or null
```

### Get Active Trip
```javascript
const { trip, error } = await tripService.getActiveTrip();
// Returns: Currently active trip
```

---

## UPDATE Trip
```javascript
const { trip, error } = await tripService.updateTrip(tripId, {
    destination: 'New Destination',
    travelers: 3,
    budget: 6000,
    status: 'ongoing'  // 'planned' | 'ongoing' | 'completed' | 'cancelled'
});
```

---

## DELETE Trip
```javascript
const { error } = await tripService.deleteTrip(tripId);
// Returns: error or null
```

---

## SET Active Trip
```javascript
const { error } = await tripService.setActiveTrip(tripId);
```

---

## Response Format

### Success
```javascript
{
    trip: { id, destination, ... },  // or trips: [...]
    error: null
}
```

### Error
```javascript
{
    trip: null,  // or trips: []
    error: Error object
}
```

---

## Complete Example
```javascript
import { useState, useEffect } from 'react';
import { tripService } from './services';

const MyTrips = () => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        loadTrips();
    }, []);

    const loadTrips = async () => {
        const { trips } = await tripService.getTrips();
        setTrips(trips);
    };

    const createTrip = async () => {
        const { trip, error } = await tripService.createTrip({
            destination: 'Paris',
            start_date: '2025-01-15',
            end_date: '2025-01-22',
            travel_type: 'couple'
        });

        if (!error) {
            loadTrips(); // Refresh list
        }
    };

    const updateTrip = async (id) => {
        await tripService.updateTrip(id, { travelers: 3 });
        loadTrips();
    };

    const deleteTrip = async (id) => {
        if (confirm('Delete?')) {
            await tripService.deleteTrip(id);
            loadTrips();
        }
    };

    return (
        <div>
            <button onClick={createTrip}>Create Trip</button>
            {trips.map(trip => (
                <div key={trip.id}>
                    <h3>{trip.destination}</h3>
                    <button onClick={() => updateTrip(trip.id)}>Update</button>
                    <button onClick={() => deleteTrip(trip.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};
```

---

## Error Handling
```javascript
const { trip, error } = await tripService.createTrip(data);

if (error) {
    console.error('Error:', error);
    alert('Failed to create trip');
    return;
}

// Success - use trip
console.log('Created:', trip);
```

---

## Access Control

### LOCAL Mode
- No authentication required
- All trips in localStorage
- No user filtering

### SUPABASE Mode
- User must be authenticated
- Auto-filters by user_id
- RLS policies enforce isolation

---

## Trip Object Structure
```javascript
{
    id: 'trip_123...',
    user_id: 'user_456...',      // Supabase only
    destination: 'Goa, India',
    start_date: '2024-12-20',
    end_date: '2024-12-25',
    travel_type: 'couple',
    travelers: 2,
    budget: 5000.00,
    status: 'planned',
    notes: 'Anniversary trip',
    created_at: '2024-12-15T10:00:00Z',
    updated_at: '2024-12-15T10:00:00Z'
}
```

---

## Best Practices

✅ Always handle errors
✅ Show loading states
✅ Confirm before delete
✅ Reload data after mutations
✅ Use try-catch for safety

---

**Full Guide**: `TRIP_CRUD_GUIDE.md`
