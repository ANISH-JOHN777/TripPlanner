# Quick Reference - React Router Setup

## Routes

| Path | Component | Description | Requires Active Trip? |
|------|-----------|-------------|----------------------|
| `/` | → `/overview` | Root redirect | No |
| `/overview` | Overview | Trip dashboard | No (shows CTA) |
| `/trip-creator` | TripCreator | Create new trip | No |
| `/day-planner` | DayPlanner | Daily itinerary | Yes (redirects) |
| `/saved-trips` | SavedTrips | All saved trips | No |
| `/notifications` | Notifications | Notification center | No |
| `/settings` | Settings | App settings | No |
| `*` | → `/overview` | Catch-all | No |

## Navigation Examples

### Using Link
```jsx
import { Link } from 'react-router-dom';

<Link to="/overview">Go to Overview</Link>
<Link to="/trip-creator">Create Trip</Link>
```

### Using useNavigate
```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/overview');
navigate('/day-planner');
```

### Using Navigate Component
```jsx
import { Navigate } from 'react-router-dom';

if (!activeTrip) {
  return <Navigate to="/trip-creator" replace />;
}
```

## TripContext Access

```jsx
import { useTripContext } from '../context/TripContext';

const {
  trips,           // All trips array
  activeTrip,      // Current active trip
  createTrip,      // Create new trip
  selectTrip,      // Select trip as active
  updateActiveTrip // Update active trip
} = useTripContext();
```

## Common Patterns

### Create Trip and Navigate
```jsx
const handleSave = () => {
  createTrip(tripData); // Auto-sets as active
  navigate('/overview');
};
```

### Select Trip and Navigate
```jsx
const handleSelect = (tripId) => {
  selectTrip(tripId);
  navigate('/overview');
};
```

### Protected Page
```jsx
if (!activeTrip) {
  return <Navigate to="/trip-creator" replace />;
}
```

### Safe Access
```jsx
if (!activeTrip) {
  return <NoTripMessage />;
}

// Or use optional chaining
const destination = activeTrip?.destination || 'Unknown';
```

## File Structure

```
src/
├── pages/
│   ├── Overview.jsx
│   ├── TripCreator.jsx
│   ├── DayPlanner.jsx
│   ├── SavedTrips.jsx
│   ├── Notifications.jsx
│   └── Settings.jsx
├── components/
│   └── Sidebar.jsx
├── context/
│   └── TripContext.jsx
└── App.jsx (Router setup)
```

## Testing Checklist

- [ ] Navigate to each route
- [ ] Create a trip
- [ ] Verify activeTrip persists
- [ ] Test /day-planner redirect
- [ ] Select different trip
- [ ] Test mobile navigation
- [ ] Verify localStorage sync

## Dev Server

```bash
npm run dev
# Open http://localhost:5173
```

---

**Quick Start**: Open http://localhost:5173 → Create a trip → Navigate between pages
