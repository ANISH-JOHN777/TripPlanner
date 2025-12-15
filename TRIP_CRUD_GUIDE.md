# 🚀 Trip CRUD Operations - Complete Guide

## Overview

The `tripService` provides full CRUD (Create, Read, Update, Delete) operations for trips with:
- ✅ User-based access control
- ✅ Clean, predictable responses
- ✅ Graceful error handling
- ✅ Works in both LOCAL and SUPABASE modes

---

## 📋 Available Operations

### 1. **CREATE** - Create a new trip
### 2. **READ** - Get all trips or a single trip
### 3. **UPDATE** - Update trip information
### 4. **DELETE** - Delete a trip
### 5. **BONUS** - Get/Set active trip

---

## 🔧 Import

```javascript
import { tripService } from './services';
// or
import tripService from './services/tripService';
```

---

## 1️⃣ CREATE Trip

### Method
```javascript
tripService.createTrip(tripData)
```

### Parameters
```javascript
{
    destination: string,      // Required
    start_date: string,       // Required (YYYY-MM-DD)
    end_date: string,         // Required (YYYY-MM-DD)
    travel_type: string,      // Required ('solo', 'couple', 'group')
    travelers: number,        // Optional (default: 1)
    budget: number,           // Optional
    status: string,           // Optional (default: 'planned')
    notes: string             // Optional
}
```

### Response
```javascript
{
    trip: {
        id: string,
        user_id: string,      // Auto-added in Supabase mode
        destination: string,
        start_date: string,
        end_date: string,
        travel_type: string,
        travelers: number,
        budget: number,
        status: string,
        notes: string,
        created_at: string,
        updated_at: string
    },
    error: null | Error
}
```

### Example Usage

```javascript
// Basic trip creation
const createTrip = async () => {
    const { trip, error } = await tripService.createTrip({
        destination: 'Goa, India',
        start_date: '2024-12-20',
        end_date: '2024-12-25',
        travel_type: 'couple',
        travelers: 2
    });

    if (error) {
        console.error('Failed to create trip:', error);
        alert('Error creating trip');
        return;
    }

    console.log('Trip created:', trip);
    alert(`Trip to ${trip.destination} created successfully!`);
    return trip;
};

// Advanced trip creation with all fields
const createDetailedTrip = async () => {
    const { trip, error } = await tripService.createTrip({
        destination: 'Paris, France',
        start_date: '2025-01-15',
        end_date: '2025-01-22',
        travel_type: 'group',
        travelers: 4,
        budget: 5000.00,
        status: 'planned',
        notes: 'Anniversary trip with friends'
    });

    if (error) {
        console.error('Error:', error);
        return null;
    }

    return trip;
};
```

---

## 2️⃣ READ Trips

### Get All Trips

#### Method
```javascript
tripService.getTrips()
```

#### Response
```javascript
{
    trips: Array<Trip>,
    error: null | Error
}
```

#### Example Usage

```javascript
// Get all trips for current user
const fetchAllTrips = async () => {
    const { trips, error } = await tripService.getTrips();

    if (error) {
        console.error('Failed to load trips:', error);
        return [];
    }

    console.log(`Loaded ${trips.length} trips`);
    return trips;
};

// Display trips in component
const TripList = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTrips();
    }, []);

    const loadTrips = async () => {
        setLoading(true);
        const { trips, error } = await tripService.getTrips();
        
        if (!error) {
            setTrips(trips);
        }
        
        setLoading(false);
    };

    if (loading) return <div>Loading trips...</div>;

    return (
        <div>
            <h2>My Trips ({trips.length})</h2>
            {trips.map(trip => (
                <div key={trip.id}>
                    <h3>{trip.destination}</h3>
                    <p>{trip.start_date} to {trip.end_date}</p>
                </div>
            ))}
        </div>
    );
};
```

### Get Single Trip

#### Method
```javascript
tripService.getTrip(tripId)
```

#### Parameters
- `tripId` (string): The trip ID

#### Response
```javascript
{
    trip: Trip | null,
    error: null | Error
}
```

#### Example Usage

```javascript
// Get trip by ID
const fetchTrip = async (tripId) => {
    const { trip, error } = await tripService.getTrip(tripId);

    if (error) {
        console.error('Trip not found:', error);
        return null;
    }

    console.log('Trip loaded:', trip);
    return trip;
};

// Load trip details in component
const TripDetails = ({ tripId }) => {
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTripDetails();
    }, [tripId]);

    const loadTripDetails = async () => {
        setLoading(true);
        const { trip, error } = await tripService.getTrip(tripId);
        
        if (!error && trip) {
            setTrip(trip);
        }
        
        setLoading(false);
    };

    if (loading) return <div>Loading...</div>;
    if (!trip) return <div>Trip not found</div>;

    return (
        <div>
            <h1>{trip.destination}</h1>
            <p>From: {trip.start_date}</p>
            <p>To: {trip.end_date}</p>
            <p>Type: {trip.travel_type}</p>
            <p>Travelers: {trip.travelers}</p>
            {trip.budget && <p>Budget: ${trip.budget}</p>}
            {trip.notes && <p>Notes: {trip.notes}</p>}
        </div>
    );
};
```

---

## 3️⃣ UPDATE Trip

### Method
```javascript
tripService.updateTrip(tripId, updates)
```

### Parameters
- `tripId` (string): The trip ID
- `updates` (object): Fields to update

### Response
```javascript
{
    trip: Trip | null,
    error: null | Error
}
```

### Example Usage

```javascript
// Update trip destination
const updateDestination = async (tripId, newDestination) => {
    const { trip, error } = await tripService.updateTrip(tripId, {
        destination: newDestination
    });

    if (error) {
        console.error('Failed to update trip:', error);
        alert('Error updating trip');
        return null;
    }

    console.log('Trip updated:', trip);
    alert('Trip updated successfully!');
    return trip;
};

// Update multiple fields
const updateTripDetails = async (tripId, updates) => {
    const { trip, error } = await tripService.updateTrip(tripId, {
        travelers: updates.travelers,
        budget: updates.budget,
        notes: updates.notes,
        status: updates.status
    });

    if (error) {
        console.error('Update failed:', error);
        return null;
    }

    return trip;
};

// Update trip in component
const EditTrip = ({ tripId }) => {
    const [formData, setFormData] = useState({
        destination: '',
        travelers: 1,
        budget: 0,
        notes: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { trip, error } = await tripService.updateTrip(tripId, formData);

        if (error) {
            alert('Failed to update trip');
            return;
        }

        alert('Trip updated successfully!');
        // Navigate or refresh
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                placeholder="Destination"
            />
            <input
                type="number"
                value={formData.travelers}
                onChange={(e) => setFormData({...formData, travelers: parseInt(e.target.value)})}
                placeholder="Travelers"
            />
            <button type="submit">Update Trip</button>
        </form>
    );
};
```

---

## 4️⃣ DELETE Trip

### Method
```javascript
tripService.deleteTrip(tripId)
```

### Parameters
- `tripId` (string): The trip ID

### Response
```javascript
{
    error: null | Error
}
```

### Example Usage

```javascript
// Delete trip
const removeTrip = async (tripId) => {
    // Confirm before deleting
    if (!confirm('Are you sure you want to delete this trip?')) {
        return;
    }

    const { error } = await tripService.deleteTrip(tripId);

    if (error) {
        console.error('Failed to delete trip:', error);
        alert('Error deleting trip');
        return false;
    }

    console.log('Trip deleted successfully');
    alert('Trip deleted!');
    return true;
};

// Delete with confirmation in component
const TripCard = ({ trip, onDelete }) => {
    const handleDelete = async () => {
        if (!confirm(`Delete trip to ${trip.destination}?`)) {
            return;
        }

        const { error } = await tripService.deleteTrip(trip.id);

        if (error) {
            alert('Failed to delete trip');
            return;
        }

        alert('Trip deleted successfully!');
        onDelete(trip.id); // Callback to update UI
    };

    return (
        <div className="trip-card">
            <h3>{trip.destination}</h3>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};
```

---

## 5️⃣ BONUS: Active Trip

### Get Active Trip

#### Method
```javascript
tripService.getActiveTrip()
```

#### Response
```javascript
{
    trip: Trip | null,
    error: null | Error
}
```

#### Example Usage

```javascript
const loadActiveTrip = async () => {
    const { trip, error } = await tripService.getActiveTrip();

    if (error) {
        console.error('No active trip:', error);
        return null;
    }

    return trip;
};
```

### Set Active Trip

#### Method
```javascript
tripService.setActiveTrip(tripId)
```

#### Parameters
- `tripId` (string): The trip ID

#### Response
```javascript
{
    error: null | Error
}
```

#### Example Usage

```javascript
const selectTrip = async (tripId) => {
    const { error } = await tripService.setActiveTrip(tripId);

    if (error) {
        console.error('Failed to set active trip:', error);
        return false;
    }

    console.log('Active trip set');
    return true;
};
```

---

## 🔐 Access Control

### LOCAL Mode
- No authentication required
- All trips stored in localStorage
- No user filtering

### SUPABASE Mode
- User must be authenticated
- Automatically filters trips by `user_id`
- RLS policies enforce data isolation
- Users can only access their own trips

### Example: Checking Auth Before Operations

```javascript
import { useAuth } from './context/AuthContext';
import { tripService } from './services';

const TripManager = () => {
    const { isAuthenticated, user } = useAuth();

    const createTrip = async (tripData) => {
        // In Supabase mode, this will fail if not authenticated
        const { trip, error } = await tripService.createTrip(tripData);

        if (error) {
            if (error.message === 'User not authenticated') {
                alert('Please log in to create trips');
                // Redirect to /auth
                return;
            }
            alert('Error creating trip');
            return;
        }

        return trip;
    };

    return (
        <div>
            {isAuthenticated ? (
                <p>Logged in as: {user.email}</p>
            ) : (
                <p>Using guest mode (local storage)</p>
            )}
        </div>
    );
};
```

---

## 🎯 Complete Example: Trip Management Component

```javascript
import { useState, useEffect } from 'react';
import { tripService } from './services';
import { useAuth } from './context/AuthContext';

const TripManagement = () => {
    const { isAuthenticated } = useAuth();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        destination: '',
        start_date: '',
        end_date: '',
        travel_type: 'solo',
        travelers: 1
    });

    // Load trips on mount
    useEffect(() => {
        loadTrips();
    }, []);

    // CREATE - Load all trips
    const loadTrips = async () => {
        setLoading(true);
        const { trips, error } = await tripService.getTrips();
        
        if (!error) {
            setTrips(trips);
        }
        
        setLoading(false);
    };

    // CREATE - Create new trip
    const handleCreate = async (e) => {
        e.preventDefault();

        const { trip, error } = await tripService.createTrip(formData);

        if (error) {
            alert('Failed to create trip');
            return;
        }

        alert('Trip created successfully!');
        setFormData({
            destination: '',
            start_date: '',
            end_date: '',
            travel_type: 'solo',
            travelers: 1
        });
        
        // Reload trips
        loadTrips();
    };

    // UPDATE - Update trip
    const handleUpdate = async (tripId, updates) => {
        const { trip, error } = await tripService.updateTrip(tripId, updates);

        if (error) {
            alert('Failed to update trip');
            return;
        }

        alert('Trip updated!');
        loadTrips();
    };

    // DELETE - Delete trip
    const handleDelete = async (tripId) => {
        if (!confirm('Delete this trip?')) return;

        const { error } = await tripService.deleteTrip(tripId);

        if (error) {
            alert('Failed to delete trip');
            return;
        }

        alert('Trip deleted!');
        loadTrips();
    };

    return (
        <div className="trip-management">
            <h1>Trip Management</h1>
            
            {/* CREATE FORM */}
            <form onSubmit={handleCreate}>
                <h2>Create New Trip</h2>
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
                <select
                    value={formData.travel_type}
                    onChange={(e) => setFormData({...formData, travel_type: e.target.value})}
                >
                    <option value="solo">Solo</option>
                    <option value="couple">Couple</option>
                    <option value="group">Group</option>
                </select>
                <button type="submit">Create Trip</button>
            </form>

            {/* TRIP LIST */}
            <div className="trip-list">
                <h2>My Trips ({trips.length})</h2>
                
                {loading ? (
                    <p>Loading...</p>
                ) : trips.length === 0 ? (
                    <p>No trips yet. Create your first trip!</p>
                ) : (
                    trips.map(trip => (
                        <div key={trip.id} className="trip-card">
                            <h3>{trip.destination}</h3>
                            <p>{trip.start_date} to {trip.end_date}</p>
                            <p>Type: {trip.travel_type}</p>
                            <p>Travelers: {trip.travelers}</p>
                            
                            <button onClick={() => handleUpdate(trip.id, { 
                                travelers: trip.travelers + 1 
                            })}>
                                Add Traveler
                            </button>
                            
                            <button onClick={() => handleDelete(trip.id)}>
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TripManagement;
```

---

## ✅ Best Practices

### 1. Always Handle Errors
```javascript
const { trip, error } = await tripService.createTrip(data);
if (error) {
    // Handle error
    console.error(error);
    return;
}
// Use trip
```

### 2. Show Loading States
```javascript
const [loading, setLoading] = useState(false);

const loadData = async () => {
    setLoading(true);
    const { trips } = await tripService.getTrips();
    setLoading(false);
};
```

### 3. Confirm Destructive Actions
```javascript
const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await tripService.deleteTrip(id);
};
```

### 4. Reload Data After Mutations
```javascript
const handleCreate = async (data) => {
    await tripService.createTrip(data);
    loadTrips(); // Refresh list
};
```

### 5. Use Try-Catch for Extra Safety
```javascript
try {
    const { trip, error } = await tripService.createTrip(data);
    if (error) throw error;
    // Success
} catch (err) {
    console.error('Unexpected error:', err);
    alert('Something went wrong');
}
```

---

## 🎉 Summary

The `tripService` provides:
- ✅ **Full CRUD operations**
- ✅ **User-based access control** (Supabase mode)
- ✅ **Clean, predictable responses**
- ✅ **Graceful error handling**
- ✅ **Works in both modes** (LOCAL & SUPABASE)
- ✅ **Single access layer** for all trip operations

**You're ready to build trip management features!** 🚀
