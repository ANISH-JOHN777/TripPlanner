# 📊 Database Schema Documentation

## Overview

The AI Trip Planner database consists of **4 main tables** with proper relationships and security policies.

---

## 🗂️ Database Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE SCHEMA                           │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐
│    USERS     │
├──────────────┤
│ id (PK)      │──┐
│ email        │  │
│ full_name    │  │
│ avatar_url   │  │
│ preferences  │  │
│ created_at   │  │
│ updated_at   │  │
└──────────────┘  │
                  │
                  │ user_id (FK)
                  │
                  ▼
┌──────────────┐  ┌──────────────┐
│    TRIPS     │  │  DAY_PLANS   │
├──────────────┤  ├──────────────┤
│ id (PK)      │──│ id (PK)      │
│ user_id (FK) │  │ trip_id (FK) │
│ destination  │  │ day_number   │
│ start_date   │  │ day_date     │
│ end_date     │  │ activities   │ (JSONB)
│ travel_type  │  │ notes        │
│ travelers    │  │ budget       │
│ budget       │  │ created_at   │
│ status       │  │ updated_at   │
│ notes        │  └──────────────┘
│ created_at   │
│ updated_at   │  ┌──────────────┐
└──────────────┘  │   STORIES    │
       │          ├──────────────┤
       │          │ id (PK)      │
       └──────────│ trip_id (FK) │
                  │ title        │
                  │ story_text   │
                  │ image_url    │
                  │ tags         │
                  │ is_public    │
                  │ likes_count  │
                  │ created_at   │
                  │ updated_at   │
                  └──────────────┘
```

---

## 📋 Table Definitions

### 1. **USERS** Table

Extends Supabase Auth with additional profile data.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, FK → auth.users | User ID from Supabase Auth |
| `email` | TEXT | NOT NULL, UNIQUE | User's email address |
| `full_name` | TEXT | - | User's full name |
| `avatar_url` | TEXT | - | URL to user's avatar image |
| `preferences` | JSONB | DEFAULT '{}' | User preferences (theme, notifications, etc.) |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Account creation timestamp |
| `updated_at` | TIMESTAMP | AUTO-UPDATE | Last update timestamp |

**Indexes:**
- `users_email_idx` on `email`

**RLS Policies:**
- Users can view their own profile
- Users can update their own profile

---

### 2. **TRIPS** Table

Stores trip information for each user.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique trip identifier |
| `user_id` | UUID | NOT NULL, FK → users(id) | Trip owner |
| `destination` | TEXT | NOT NULL | Trip destination |
| `start_date` | DATE | NOT NULL | Trip start date |
| `end_date` | DATE | NOT NULL, >= start_date | Trip end date |
| `travel_type` | TEXT | NOT NULL, IN ('solo', 'couple', 'group') | Type of travel |
| `travelers` | INTEGER | DEFAULT 1, > 0 | Number of travelers |
| `budget` | DECIMAL(10,2) | >= 0 | Trip budget |
| `status` | TEXT | DEFAULT 'planned' | Trip status |
| `notes` | TEXT | - | Additional notes |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | AUTO-UPDATE | Last update timestamp |

**Indexes:**
- `trips_user_id_idx` on `user_id`
- `trips_start_date_idx` on `start_date`
- `trips_status_idx` on `status`
- `trips_created_at_idx` on `created_at DESC`

**RLS Policies:**
- Users can only view/insert/update/delete their own trips

---

### 3. **DAY_PLANS** Table

Stores daily itineraries for each trip.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique day plan identifier |
| `trip_id` | UUID | NOT NULL, FK → trips(id) | Associated trip |
| `day_number` | INTEGER | NOT NULL, > 0 | Day number (1, 2, 3...) |
| `day_date` | DATE | - | Actual date of the day |
| `activities` | JSONB | DEFAULT '[]' | Array of activities |
| `notes` | TEXT | - | Day-specific notes |
| `budget` | DECIMAL(10,2) | >= 0 | Day budget |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | AUTO-UPDATE | Last update timestamp |

**Unique Constraint:**
- `(trip_id, day_number)` - One plan per day per trip

**Indexes:**
- `day_plans_trip_id_idx` on `trip_id`
- `day_plans_day_number_idx` on `day_number`

**Activities JSONB Structure:**
```json
[
  {
    "id": 1,
    "time": "09:00",
    "title": "Beach Visit",
    "description": "Visit Calangute Beach",
    "location": "Calangute, Goa",
    "type": "activity",
    "completed": false
  },
  {
    "id": 2,
    "time": "14:00",
    "title": "Lunch",
    "description": "Seafood at beach shack",
    "type": "food",
    "completed": false
  }
]
```

**RLS Policies:**
- Users can only access day plans for their own trips

---

### 4. **STORIES** Table

Stores trip stories created by users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique story identifier |
| `trip_id` | UUID | NOT NULL, FK → trips(id) | Associated trip |
| `title` | TEXT | NOT NULL, NOT EMPTY | Story title |
| `story_text` | TEXT | NOT NULL, NOT EMPTY | Story content |
| `image_url` | TEXT | - | URL to story image |
| `tags` | TEXT[] | - | Story tags |
| `is_public` | BOOLEAN | DEFAULT FALSE | Public visibility |
| `likes_count` | INTEGER | DEFAULT 0, >= 0 | Number of likes |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | AUTO-UPDATE | Last update timestamp |

**Indexes:**
- `stories_trip_id_idx` on `trip_id`
- `stories_created_at_idx` on `created_at DESC`
- `stories_is_public_idx` on `is_public` (WHERE is_public = TRUE)

**RLS Policies:**
- Users can access stories for their own trips
- Anyone can view public stories

---

## 🔗 Relationships

### Foreign Keys

1. **users.id** → **auth.users.id** (CASCADE DELETE)
   - When auth user is deleted, profile is deleted

2. **trips.user_id** → **users.id** (CASCADE DELETE)
   - When user is deleted, all trips are deleted

3. **day_plans.trip_id** → **trips.id** (CASCADE DELETE)
   - When trip is deleted, all day plans are deleted

4. **stories.trip_id** → **trips.id** (CASCADE DELETE)
   - When trip is deleted, all stories are deleted

### Cascade Behavior

```
DELETE auth.users
    ↓
DELETE users (CASCADE)
    ↓
DELETE trips (CASCADE)
    ↓
DELETE day_plans + stories (CASCADE)
```

---

## 🔐 Security (Row Level Security)

### Enabled on All Tables
- ✅ users
- ✅ trips
- ✅ day_plans
- ✅ stories

### Policy Summary

| Table | Policy | Description |
|-------|--------|-------------|
| **users** | View own profile | `auth.uid() = id` |
| **users** | Update own profile | `auth.uid() = id` |
| **trips** | CRUD own trips | `auth.uid() = user_id` |
| **day_plans** | CRUD via trip ownership | Check if trip belongs to user |
| **stories** | CRUD via trip ownership | Check if trip belongs to user |
| **stories** | View public stories | `is_public = TRUE` |

---

## 📈 Performance Optimizations

### Indexes Created

1. **users**: email
2. **trips**: user_id, start_date, status, created_at
3. **day_plans**: trip_id, day_number
4. **stories**: trip_id, created_at, is_public

### Auto-Update Triggers

All tables have `updated_at` auto-update triggers:
- Automatically sets `updated_at = NOW()` on UPDATE

### Auto-Create User Profile

Trigger on `auth.users` INSERT:
- Automatically creates profile in `users` table

---

## 💾 Storage Buckets

### 1. **story-images**
- Public: ✅ Yes
- Purpose: Store story images
- Policies:
  - Authenticated users can upload
  - Anyone can view
  - Users can delete own images

### 2. **avatars**
- Public: ✅ Yes
- Purpose: Store user avatars
- Policies:
  - Users can upload to own folder
  - Anyone can view
  - Users can update/delete own avatar

---

## 📊 Helper Functions

### get_user_trip_count(user_uuid)
Returns the number of trips for a user.

### get_trip_day_plan_count(trip_uuid)
Returns the number of day plans for a trip.

### get_trip_story_count(trip_uuid)
Returns the number of stories for a trip.

---

## 🔍 Useful Views

### trips_with_counts
Trips with day plan and story counts.

```sql
SELECT * FROM trips_with_counts WHERE user_id = auth.uid();
```

### user_statistics
User statistics (trips, day plans, stories).

```sql
SELECT * FROM user_statistics WHERE id = auth.uid();
```

---

## 🧪 Sample Queries

### Get all trips for current user
```sql
SELECT * FROM trips 
WHERE user_id = auth.uid() 
ORDER BY start_date DESC;
```

### Get trip with day plans
```sql
SELECT 
    t.*,
    json_agg(dp ORDER BY dp.day_number) AS day_plans
FROM trips t
LEFT JOIN day_plans dp ON t.id = dp.trip_id
WHERE t.id = 'trip-uuid'
GROUP BY t.id;
```

### Get trip with stories
```sql
SELECT 
    t.*,
    json_agg(s ORDER BY s.created_at DESC) AS stories
FROM trips t
LEFT JOIN stories s ON t.id = s.trip_id
WHERE t.id = 'trip-uuid'
GROUP BY t.id;
```

### Create a complete trip with day plans
```sql
-- Insert trip
INSERT INTO trips (user_id, destination, start_date, end_date, travel_type)
VALUES (auth.uid(), 'Goa, India', '2024-12-20', '2024-12-25', 'couple')
RETURNING id;

-- Insert day plans (using returned trip id)
INSERT INTO day_plans (trip_id, day_number, day_date, activities)
VALUES 
    ('trip-id', 1, '2024-12-20', '[...]'::jsonb),
    ('trip-id', 2, '2024-12-21', '[...]'::jsonb);
```

---

## ✅ Verification Checklist

After running the schema:

- [ ] All 4 tables created
- [ ] Foreign keys established
- [ ] RLS enabled on all tables
- [ ] Policies created and working
- [ ] Indexes created
- [ ] Triggers working (updated_at auto-updates)
- [ ] Storage buckets created
- [ ] Storage policies set
- [ ] Helper functions available
- [ ] Views created

---

## 🚀 Next Steps

1. **Run the schema** in Supabase SQL Editor
2. **Verify** using the verification queries
3. **Test** with a sample user account
4. **Update** `.env` with Supabase credentials
5. **Set** `VITE_BACKEND_MODE=supabase`
6. **Restart** dev server

---

## 📚 Additional Resources

- **Schema File**: `supabase-schema.sql`
- **Setup Guide**: `BACKEND_SETUP_GUIDE.md`
- **Quick Reference**: `BACKEND_QUICK_REFERENCE.md`
- **Supabase Docs**: https://supabase.com/docs

---

**Schema Version**: 1.0
**Last Updated**: 2024-12-15
**Status**: ✅ Production Ready
