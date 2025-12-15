# 📅 Day-wise Planner Backend Persistence - Complete Guide

## Overview

The `dayPlanService` provides complete backend persistence for the Day-wise Planner with:
- ✅ Save day-wise plans for trips
- ✅ Fetch all day plans for a trip
- ✅ Update activities for specific days
- ✅ Delete activities or entire day plans
- ✅ Trip owner access control
- ✅ Consistent data format

---

## 📋 Available Operations

### Day Plan Operations
1. **CREATE** - Create day plan
2. **READ** - Get all day plans for a trip
3. **READ** - Get single day plan
4. **READ** - Get day plan by day number
5. **UPDATE** - Update day plan
6. **DELETE** - Delete day plan
7. **DELETE** - Delete all day plans for a trip

### Activity Operations
8. **ADD** - Add activity to day
9. **UPDATE** - Update activity
10. **DELETE** - Delete activity

---

## 🔧 Import

```javascript
import { dayPlanService } from './services';
// or
import dayPlanService from './services/dayPlanService';
```

---

## 1️⃣ CREATE Day Plan

### Method
```javascript
dayPlanService.createDayPlan(dayPlanData)
```

### Parameters
```javascript
{
    trip_id: string,          // Required - Trip ID
    day_number: number,       // Required - Day number (1, 2, 3...)
    day_date: string,         // Optional - Actual date (YYYY-MM-DD)
    activities: Array,        // Optional - Array of activities
    notes: string,            // Optional - Day notes
    budget: number            // Optional - Day budget
}
```

### Activity Structure
```javascript
{
    id: number,               // Auto-generated if not provided
    time: string,             // e.g., "09:00"
    title: string,            // Activity title
    description: string,      // Activity description
    location: string,         // Optional - Location
    type: string,             // Optional - 'activity', 'food', 'transport', etc.
    completed: boolean        // Optional - Completion status
}
```

### Response
```javascript
{
    dayPlan: {
        id: string,
        trip_id: string,
        day_number: number,
        day_date: string,
        activities: Array,
        notes: string,
        budget: number,
        created_at: string,
        updated_at: string
    },
    error: null | Error
}
```

### Example Usage

```javascript
// Create day plan with activities
const createDayPlan = async (tripId, dayNumber) => {
    const { dayPlan, error } = await dayPlanService.createDayPlan({
        trip_id: tripId,
        day_number: dayNumber,
        day_date: '2024-12-20',
        activities: [
            {
                time: '09:00',
                title: 'Beach Visit',
                description: 'Visit Calangute Beach',
                location: 'Calangute, Goa',
                type: 'activity',
                completed: false
            },
            {
                time: '14:00',
                title: 'Lunch',
                description: 'Seafood at beach shack',
                type: 'food',
                completed: false
            }
        ],
        notes: 'Bring sunscreen and beach towels',
        budget: 2000
    });

    if (error) {
        console.error('Failed to create day plan:', error);
        return null;
    }

    console.log('Day plan created:', dayPlan);
    return dayPlan;
};

// Create empty day plan (add activities later)
const createEmptyDay = async (tripId, dayNumber, date) => {
    const { dayPlan, error } = await dayPlanService.createDayPlan({
        trip_id: tripId,
        day_number: dayNumber,
        day_date: date,
        activities: []
    });

    return dayPlan;
};
```

---

## 2️⃣ READ Day Plans

### Get All Day Plans for a Trip

#### Method
```javascript
dayPlanService.getDayPlans(tripId)
```

#### Response
```javascript
{
    dayPlans: Array<DayPlan>,  // Sorted by day_number
    error: null | Error
}
```

#### Example Usage

```javascript
// Load all day plans for a trip
const loadDayPlans = async (tripId) => {
    const { dayPlans, error } = await dayPlanService.getDayPlans(tripId);

    if (error) {
        console.error('Failed to load day plans:', error);
        return [];
    }

    console.log(`Loaded ${dayPlans.length} day plan(s)`);
    return dayPlans;
};

// Display in component
const DayPlanner = ({ tripId }) => {
    const [dayPlans, setDayPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPlans();
    }, [tripId]);

    const loadPlans = async () => {
        setLoading(true);
        const { dayPlans, error } = await dayPlanService.getDayPlans(tripId);
        
        if (!error) {
            setDayPlans(dayPlans);
        }
        
        setLoading(false);
    };

    if (loading) return <div>Loading day plans...</div>;

    return (
        <div>
            <h2>Day-wise Itinerary ({dayPlans.length} days)</h2>
            {dayPlans.map((dayPlan, index) => (
                <DayCard key={dayPlan.id} dayPlan={dayPlan} dayNumber={index + 1} />
            ))}
        </div>
    );
};
```

### Get Day Plan by Day Number

#### Method
```javascript
dayPlanService.getDayPlanByNumber(tripId, dayNumber)
```

#### Parameters
- `tripId` (string): Trip ID
- `dayNumber` (number): Day number (1, 2, 3...)

#### Example Usage

```javascript
// Get specific day's plan
const loadDayPlan = async (tripId, dayNumber) => {
    const { dayPlan, error } = await dayPlanService.getDayPlanByNumber(tripId, dayNumber);

    if (error || !dayPlan) {
        console.log(`No plan for day ${dayNumber}`);
        return null;
    }

    return dayPlan;
};

// Check if day plan exists before creating
const getOrCreateDayPlan = async (tripId, dayNumber, date) => {
    // Try to get existing plan
    const { dayPlan } = await dayPlanService.getDayPlanByNumber(tripId, dayNumber);

    if (dayPlan) {
        return dayPlan;
    }

    // Create new plan if doesn't exist
    const { dayPlan: newPlan } = await dayPlanService.createDayPlan({
        trip_id: tripId,
        day_number: dayNumber,
        day_date: date,
        activities: []
    });

    return newPlan;
};
```

---

## 3️⃣ UPDATE Day Plan

### Method
```javascript
dayPlanService.updateDayPlan(dayPlanId, updates)
```

### Parameters
- `dayPlanId` (string): Day plan ID
- `updates` (object): Fields to update

### Example Usage

```javascript
// Update activities
const updateActivities = async (dayPlanId, newActivities) => {
    const { dayPlan, error } = await dayPlanService.updateDayPlan(dayPlanId, {
        activities: newActivities
    });

    if (error) {
        console.error('Failed to update activities:', error);
        return null;
    }

    return dayPlan;
};

// Update notes and budget
const updateDayInfo = async (dayPlanId, notes, budget) => {
    const { dayPlan, error } = await dayPlanService.updateDayPlan(dayPlanId, {
        notes,
        budget
    });

    return dayPlan;
};

// Update in component
const DayPlanEditor = ({ dayPlan }) => {
    const [activities, setActivities] = useState(dayPlan.activities || []);
    const [notes, setNotes] = useState(dayPlan.notes || '');

    const handleSave = async () => {
        const { dayPlan: updated, error } = await dayPlanService.updateDayPlan(
            dayPlan.id,
            { activities, notes }
        );

        if (error) {
            alert('Failed to save');
            return;
        }

        alert('Day plan saved!');
    };

    return (
        <div>
            <ActivityList activities={activities} onChange={setActivities} />
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
            <button onClick={handleSave}>Save Day Plan</button>
        </div>
    );
};
```

---

## 4️⃣ DELETE Day Plan

### Delete Single Day Plan

#### Method
```javascript
dayPlanService.deleteDayPlan(dayPlanId)
```

#### Example Usage

```javascript
// Delete day plan
const removeDayPlan = async (dayPlanId) => {
    if (!confirm('Delete this day plan?')) {
        return;
    }

    const { error } = await dayPlanService.deleteDayPlan(dayPlanId);

    if (error) {
        console.error('Failed to delete day plan:', error);
        alert('Error deleting day plan');
        return false;
    }

    alert('Day plan deleted!');
    return true;
};
```

### Delete All Day Plans for a Trip

#### Method
```javascript
dayPlanService.deleteDayPlansByTrip(tripId)
```

#### Example Usage

```javascript
// Clear all day plans for a trip
const clearAllDayPlans = async (tripId) => {
    if (!confirm('Delete all day plans for this trip?')) {
        return;
    }

    const { error } = await dayPlanService.deleteDayPlansByTrip(tripId);

    if (error) {
        console.error('Failed to delete day plans:', error);
        return false;
    }

    console.log('All day plans deleted');
    return true;
};
```

---

## 5️⃣ ACTIVITY Operations

### Add Activity

#### Method
```javascript
dayPlanService.addActivity(dayPlanId, activity)
```

#### Example Usage

```javascript
// Add new activity to a day
const addActivity = async (dayPlanId) => {
    const newActivity = {
        time: '16:00',
        title: 'Fort Visit',
        description: 'Visit Fort Aguada',
        location: 'Candolim, Goa',
        type: 'sightseeing',
        completed: false
    };

    const { dayPlan, error } = await dayPlanService.addActivity(dayPlanId, newActivity);

    if (error) {
        console.error('Failed to add activity:', error);
        return null;
    }

    console.log('Activity added:', dayPlan);
    return dayPlan;
};

// Add activity in component
const AddActivityButton = ({ dayPlanId, onActivityAdded }) => {
    const handleAdd = async () => {
        const activity = {
            time: prompt('Time (HH:MM):'),
            title: prompt('Activity title:'),
            description: prompt('Description:'),
            type: 'activity'
        };

        const { dayPlan, error } = await dayPlanService.addActivity(dayPlanId, activity);

        if (!error) {
            alert('Activity added!');
            onActivityAdded(dayPlan);
        }
    };

    return <button onClick={handleAdd}>+ Add Activity</button>;
};
```

### Update Activity

#### Method
```javascript
dayPlanService.updateActivity(dayPlanId, activityId, updates)
```

#### Example Usage

```javascript
// Update activity details
const updateActivity = async (dayPlanId, activityId, updates) => {
    const { dayPlan, error } = await dayPlanService.updateActivity(
        dayPlanId,
        activityId,
        updates
    );

    if (error) {
        console.error('Failed to update activity:', error);
        return null;
    }

    return dayPlan;
};

// Mark activity as completed
const markCompleted = async (dayPlanId, activityId) => {
    const { dayPlan } = await dayPlanService.updateActivity(
        dayPlanId,
        activityId,
        { completed: true }
    );

    return dayPlan;
};

// Edit activity in component
const ActivityItem = ({ dayPlanId, activity }) => {
    const handleEdit = async () => {
        const newTitle = prompt('New title:', activity.title);
        
        if (newTitle) {
            const { dayPlan, error } = await dayPlanService.updateActivity(
                dayPlanId,
                activity.id,
                { title: newTitle }
            );

            if (!error) {
                alert('Activity updated!');
            }
        }
    };

    const handleToggleComplete = async () => {
        await dayPlanService.updateActivity(
            dayPlanId,
            activity.id,
            { completed: !activity.completed }
        );
    };

    return (
        <div className="activity-item">
            <input
                type="checkbox"
                checked={activity.completed}
                onChange={handleToggleComplete}
            />
            <span>{activity.time} - {activity.title}</span>
            <button onClick={handleEdit}>Edit</button>
        </div>
    );
};
```

### Delete Activity

#### Method
```javascript
dayPlanService.deleteActivity(dayPlanId, activityId)
```

#### Example Usage

```javascript
// Delete activity
const removeActivity = async (dayPlanId, activityId) => {
    if (!confirm('Delete this activity?')) {
        return;
    }

    const { dayPlan, error } = await dayPlanService.deleteActivity(dayPlanId, activityId);

    if (error) {
        console.error('Failed to delete activity:', error);
        return null;
    }

    console.log('Activity deleted');
    return dayPlan;
};
```

---

## 🎯 Complete Example: Day-wise Planner Component

```javascript
import { useState, useEffect } from 'react';
import { dayPlanService } from './services';

const DayWisePlanner = ({ tripId, tripStartDate, tripEndDate }) => {
    const [dayPlans, setDayPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDay, setSelectedDay] = useState(1);

    // Calculate number of days
    const numberOfDays = Math.ceil(
        (new Date(tripEndDate) - new Date(tripStartDate)) / (1000 * 60 * 60 * 24)
    ) + 1;

    // Load day plans on mount
    useEffect(() => {
        loadDayPlans();
    }, [tripId]);

    const loadDayPlans = async () => {
        setLoading(true);
        const { dayPlans, error } = await dayPlanService.getDayPlans(tripId);
        
        if (!error) {
            setDayPlans(dayPlans);
        }
        
        setLoading(false);
    };

    // Get or create day plan for a specific day
    const getDayPlan = async (dayNumber) => {
        // Check if plan exists
        let dayPlan = dayPlans.find(dp => dp.day_number === dayNumber);

        if (!dayPlan) {
            // Create new plan
            const dayDate = new Date(tripStartDate);
            dayDate.setDate(dayDate.getDate() + (dayNumber - 1));

            const { dayPlan: newPlan } = await dayPlanService.createDayPlan({
                trip_id: tripId,
                day_number: dayNumber,
                day_date: dayDate.toISOString().split('T')[0],
                activities: []
            });

            if (newPlan) {
                setDayPlans([...dayPlans, newPlan]);
                dayPlan = newPlan;
            }
        }

        return dayPlan;
    };

    // Add activity to current day
    const handleAddActivity = async () => {
        const dayPlan = await getDayPlan(selectedDay);
        
        if (!dayPlan) return;

        const activity = {
            time: prompt('Time (HH:MM):') || '09:00',
            title: prompt('Activity title:') || 'New Activity',
            description: prompt('Description:') || '',
            type: 'activity',
            completed: false
        };

        const { dayPlan: updated, error } = await dayPlanService.addActivity(
            dayPlan.id,
            activity
        );

        if (!error) {
            loadDayPlans(); // Refresh
            alert('Activity added!');
        }
    };

    // Update activity
    const handleUpdateActivity = async (dayPlanId, activityId, updates) => {
        const { dayPlan, error } = await dayPlanService.updateActivity(
            dayPlanId,
            activityId,
            updates
        );

        if (!error) {
            loadDayPlans();
        }
    };

    // Delete activity
    const handleDeleteActivity = async (dayPlanId, activityId) => {
        if (!confirm('Delete this activity?')) return;

        const { error } = await dayPlanService.deleteActivity(dayPlanId, activityId);

        if (!error) {
            loadDayPlans();
            alert('Activity deleted!');
        }
    };

    // Delete entire day plan
    const handleDeleteDay = async (dayPlanId) => {
        if (!confirm('Delete this entire day plan?')) return;

        const { error } = await dayPlanService.deleteDayPlan(dayPlanId);

        if (!error) {
            loadDayPlans();
            alert('Day plan deleted!');
        }
    };

    const currentDayPlan = dayPlans.find(dp => dp.day_number === selectedDay);

    return (
        <div className="day-wise-planner">
            <h1>Day-wise Itinerary</h1>

            {/* Day Selector */}
            <div className="day-selector">
                {Array.from({ length: numberOfDays }, (_, i) => i + 1).map(day => (
                    <button
                        key={day}
                        className={selectedDay === day ? 'active' : ''}
                        onClick={() => setSelectedDay(day)}
                    >
                        Day {day}
                    </button>
                ))}
            </div>

            {/* Current Day Plan */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="day-plan-content">
                    <h2>Day {selectedDay}</h2>
                    
                    {currentDayPlan ? (
                        <>
                            <p>Date: {currentDayPlan.day_date}</p>
                            
                            {/* Activities */}
                            <div className="activities">
                                <h3>Activities ({currentDayPlan.activities?.length || 0})</h3>
                                
                                {currentDayPlan.activities?.map(activity => (
                                    <div key={activity.id} className="activity-item">
                                        <input
                                            type="checkbox"
                                            checked={activity.completed}
                                            onChange={() => handleUpdateActivity(
                                                currentDayPlan.id,
                                                activity.id,
                                                { completed: !activity.completed }
                                            )}
                                        />
                                        <div className="activity-details">
                                            <strong>{activity.time}</strong> - {activity.title}
                                            <p>{activity.description}</p>
                                            {activity.location && <small>📍 {activity.location}</small>}
                                        </div>
                                        <button onClick={() => handleDeleteActivity(
                                            currentDayPlan.id,
                                            activity.id
                                        )}>
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Notes */}
                            {currentDayPlan.notes && (
                                <div className="notes">
                                    <h4>Notes:</h4>
                                    <p>{currentDayPlan.notes}</p>
                                </div>
                            )}

                            {/* Budget */}
                            {currentDayPlan.budget && (
                                <div className="budget">
                                    <strong>Budget:</strong> ${currentDayPlan.budget}
                                </div>
                            )}

                            <button onClick={() => handleDeleteDay(currentDayPlan.id)}>
                                Delete Day Plan
                            </button>
                        </>
                    ) : (
                        <p>No plan for this day yet.</p>
                    )}

                    <button onClick={handleAddActivity}>+ Add Activity</button>
                </div>
            )}
        </div>
    );
};

export default DayWisePlanner;
```

---

## 🔐 Access Control

### LOCAL Mode
- No authentication required
- All day plans in localStorage
- Filtered by trip_id

### SUPABASE Mode
- User must be authenticated
- RLS policies enforce access:
  - Users can only access day plans for their own trips
  - Verified through trip ownership
- Automatic filtering by user

### RLS Policy Example
```sql
-- Users can only view day plans for their own trips
CREATE POLICY "Users can view own trip day plans"
    ON day_plans FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM trips
            WHERE trips.id = day_plans.trip_id
            AND trips.user_id = auth.uid()
        )
    );
```

---

## 📊 Data Format

### Day Plan Object
```javascript
{
    id: 'dayplan_123...',
    trip_id: 'trip_456...',
    day_number: 1,
    day_date: '2024-12-20',
    activities: [
        {
            id: 1,
            time: '09:00',
            title: 'Beach Visit',
            description: 'Visit Calangute Beach',
            location: 'Calangute, Goa',
            type: 'activity',
            completed: false
        }
    ],
    notes: 'Bring sunscreen',
    budget: 2000,
    created_at: '2024-12-15T10:00:00Z',
    updated_at: '2024-12-15T10:00:00Z'
}
```

---

## ✅ Best Practices

### 1. Load Day Plans Once
```javascript
useEffect(() => {
    loadDayPlans();
}, [tripId]); // Only reload when trip changes
```

### 2. Check for Existing Plans
```javascript
// Before creating, check if exists
const { dayPlan } = await dayPlanService.getDayPlanByNumber(tripId, dayNumber);
if (!dayPlan) {
    // Create new
}
```

### 3. Batch Activity Updates
```javascript
// Instead of updating activities one by one,
// update the entire activities array at once
const updatedActivities = [...activities, newActivity];
await dayPlanService.updateDayPlan(dayPlanId, { activities: updatedActivities });
```

### 4. Handle Missing Day Plans
```javascript
const dayPlan = dayPlans.find(dp => dp.day_number === selectedDay);
if (!dayPlan) {
    // Show "No plan yet" message
    // Or auto-create empty plan
}
```

### 5. Confirm Deletions
```javascript
if (!confirm('Delete this activity?')) return;
await dayPlanService.deleteActivity(dayPlanId, activityId);
```

---

## 🎉 Summary

The `dayPlanService` provides:
- ✅ **Complete day plan management**
- ✅ **Activity CRUD operations**
- ✅ **Trip-based organization**
- ✅ **Owner access control**
- ✅ **Consistent data format**
- ✅ **Works in both modes** (LOCAL & SUPABASE)

**Your Day-wise Planner backend is ready!** 🚀
