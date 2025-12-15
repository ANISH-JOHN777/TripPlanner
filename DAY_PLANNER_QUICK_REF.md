# 📅 Day Planner Backend - Quick Reference

## Import
```javascript
import { dayPlanService } from './services';
```

---

## Day Plan Operations

### CREATE Day Plan
```javascript
const { dayPlan, error } = await dayPlanService.createDayPlan({
    trip_id: tripId,
    day_number: 1,
    day_date: '2024-12-20',
    activities: [
        {
            time: '09:00',
            title: 'Beach Visit',
            description: 'Visit Calangute Beach',
            type: 'activity',
            completed: false
        }
    ],
    notes: 'Bring sunscreen',
    budget: 2000
});
```

### READ Day Plans
```javascript
// Get all day plans for a trip
const { dayPlans, error } = await dayPlanService.getDayPlans(tripId);

// Get day plan by day number
const { dayPlan, error } = await dayPlanService.getDayPlanByNumber(tripId, 1);

// Get single day plan by ID
const { dayPlan, error } = await dayPlanService.getDayPlan(dayPlanId);
```

### UPDATE Day Plan
```javascript
const { dayPlan, error } = await dayPlanService.updateDayPlan(dayPlanId, {
    activities: updatedActivities,
    notes: 'Updated notes',
    budget: 3000
});
```

### DELETE Day Plan
```javascript
// Delete single day plan
const { error } = await dayPlanService.deleteDayPlan(dayPlanId);

// Delete all day plans for a trip
const { error } = await dayPlanService.deleteDayPlansByTrip(tripId);
```

---

## Activity Operations

### ADD Activity
```javascript
const { dayPlan, error } = await dayPlanService.addActivity(dayPlanId, {
    time: '16:00',
    title: 'Fort Visit',
    description: 'Visit Fort Aguada',
    location: 'Candolim, Goa',
    type: 'sightseeing',
    completed: false
});
```

### UPDATE Activity
```javascript
const { dayPlan, error } = await dayPlanService.updateActivity(
    dayPlanId,
    activityId,
    { completed: true }
);
```

### DELETE Activity
```javascript
const { dayPlan, error } = await dayPlanService.deleteActivity(dayPlanId, activityId);
```

---

## Activity Structure
```javascript
{
    id: 1,                    // Auto-generated
    time: '09:00',            // HH:MM format
    title: 'Activity Title',
    description: 'Details',
    location: 'Location',     // Optional
    type: 'activity',         // 'activity', 'food', 'transport', etc.
    completed: false          // Completion status
}
```

---

## Day Plan Structure
```javascript
{
    id: 'dayplan_123...',
    trip_id: 'trip_456...',
    day_number: 1,
    day_date: '2024-12-20',
    activities: [...],
    notes: 'Day notes',
    budget: 2000,
    created_at: '2024-12-15T10:00:00Z',
    updated_at: '2024-12-15T10:00:00Z'
}
```

---

## Complete Example
```javascript
const DayPlanner = ({ tripId }) => {
    const [dayPlans, setDayPlans] = useState([]);

    useEffect(() => {
        loadDayPlans();
    }, [tripId]);

    const loadDayPlans = async () => {
        const { dayPlans } = await dayPlanService.getDayPlans(tripId);
        setDayPlans(dayPlans);
    };

    const createDay = async (dayNumber, date) => {
        const { dayPlan } = await dayPlanService.createDayPlan({
            trip_id: tripId,
            day_number: dayNumber,
            day_date: date,
            activities: []
        });
        loadDayPlans();
    };

    const addActivity = async (dayPlanId) => {
        const { dayPlan } = await dayPlanService.addActivity(dayPlanId, {
            time: '09:00',
            title: 'New Activity',
            type: 'activity'
        });
        loadDayPlans();
    };

    const updateActivity = async (dayPlanId, activityId) => {
        await dayPlanService.updateActivity(dayPlanId, activityId, {
            completed: true
        });
        loadDayPlans();
    };

    const deleteActivity = async (dayPlanId, activityId) => {
        if (confirm('Delete?')) {
            await dayPlanService.deleteActivity(dayPlanId, activityId);
            loadDayPlans();
        }
    };

    return (
        <div>
            {dayPlans.map(dayPlan => (
                <div key={dayPlan.id}>
                    <h3>Day {dayPlan.day_number}</h3>
                    {dayPlan.activities.map(activity => (
                        <div key={activity.id}>
                            <input
                                type="checkbox"
                                checked={activity.completed}
                                onChange={() => updateActivity(dayPlan.id, activity.id)}
                            />
                            {activity.time} - {activity.title}
                            <button onClick={() => deleteActivity(dayPlan.id, activity.id)}>
                                Delete
                            </button>
                        </div>
                    ))}
                    <button onClick={() => addActivity(dayPlan.id)}>+ Add Activity</button>
                </div>
            ))}
        </div>
    );
};
```

---

## Access Control

### LOCAL Mode
- No auth required
- Data in localStorage
- Filtered by trip_id

### SUPABASE Mode
- User must be authenticated
- RLS policies enforce ownership
- Only trip owner can access

---

## Best Practices

✅ Load day plans once per trip
✅ Check for existing plans before creating
✅ Batch activity updates
✅ Handle missing day plans gracefully
✅ Confirm before deletions
✅ Reload data after mutations

---

## Error Handling
```javascript
const { dayPlan, error } = await dayPlanService.createDayPlan(data);

if (error) {
    console.error('Error:', error);
    alert('Failed to create day plan');
    return;
}

// Success - use dayPlan
```

---

**Full Guide**: `DAY_PLANNER_BACKEND_GUIDE.md`
