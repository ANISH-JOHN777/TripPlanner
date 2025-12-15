# 🧪 Complete Project Test Flow

## Overview

This document provides a comprehensive test flow to verify all features of the AI Trip Planner are working correctly.

**Test Date**: 2024-12-15
**Mode**: LOCAL (localStorage)
**Backend**: Ready for Supabase integration

---

## 🎯 Test Flow Overview

### Phase 1: Initial Setup & Navigation
1. Launch application
2. Verify home page loads
3. Test navigation between pages
4. Check responsive design

### Phase 2: Trip Creation & Management
1. Create a new trip
2. View trip in overview
3. Update trip details
4. Verify data persistence

### Phase 3: Day-wise Planning
1. Access day planner
2. Add activities to days
3. Update activities
4. Delete activities
5. Verify persistence

### Phase 4: Smart Tools
1. Test Trip Story Creator
2. Generate AI story
3. Upload image
4. Save story

### Phase 5: Booking Features
1. Test Hotel Finder
2. Test Transport options
3. Test Restaurant finder
4. Test Expense Splitter
5. Test Currency Converter

### Phase 6: Saved Trips & Stories
1. View saved trips
2. View saved stories
3. Delete trip
4. Verify cascade delete

### Phase 7: Backend Integration (Optional)
1. Set up Supabase
2. Test authentication
3. Verify data sync
4. Test cross-device access

---

## 📋 Detailed Test Steps

### Phase 1: Initial Setup & Navigation

#### Step 1.1: Launch Application
```
✅ Action: Open http://localhost:5173
✅ Expected: Home page loads without errors
✅ Verify: 
   - No console errors
   - All images load
   - Navigation visible
   - Hero section displays
```

#### Step 1.2: Test Navigation
```
✅ Action: Click each navigation link
✅ Pages to test:
   - Home (/)
   - Overview (/overview)
   - Day Planner (/day-planner)
   - Smart Tools (/smart-tools)
   - Bookings (/bookings)
   - Saved Trips (/saved-trips)

✅ Expected: Each page loads correctly
✅ Verify: No 404 errors, smooth transitions
```

#### Step 1.3: Responsive Design
```
✅ Action: Resize browser window
✅ Test: Mobile (375px), Tablet (768px), Desktop (1920px)
✅ Expected: Layout adapts properly
✅ Verify: No overflow, readable text, accessible buttons
```

---

### Phase 2: Trip Creation & Management

#### Step 2.1: Create New Trip
```
✅ Action: Navigate to Home → Click "Plan Your Trip"
✅ Fill form:
   - Destination: "Goa, India"
   - Start Date: Tomorrow's date
   - End Date: 5 days from tomorrow
   - Travel Type: "Couple"
   - Travelers: 2
   - Budget: 50000

✅ Action: Click "Create Trip"
✅ Expected: 
   - Success message
   - Redirect to Overview
   - Trip appears in overview

✅ Verify localStorage:
   - Open DevTools → Application → Local Storage
   - Check: aiTripPlanner_trips
   - Verify: Trip data saved
```

#### Step 2.2: View Trip Details
```
✅ Action: In Overview, click on the trip card
✅ Expected: Trip details displayed
✅ Verify:
   - Destination shown
   - Dates correct
   - Budget displayed
   - Travelers count correct
```

#### Step 2.3: Update Trip
```
✅ Action: Click "Edit" or update button
✅ Change: Budget to 60000
✅ Action: Save changes
✅ Expected: Updated budget displayed
✅ Verify localStorage: Budget updated
```

---

### Phase 3: Day-wise Planning

#### Step 3.1: Access Day Planner
```
✅ Action: Navigate to Day Planner
✅ Expected: 
   - Active trip loaded
   - Days displayed (based on trip duration)
   - Empty state if no activities
```

#### Step 3.2: Add Activity to Day 1
```
✅ Action: Select Day 1
✅ Action: Click "Add Activity"
✅ Fill form:
   - Time: 09:00
   - Title: "Beach Visit"
   - Description: "Visit Calangute Beach"
   - Type: "Activity"

✅ Action: Save activity
✅ Expected: Activity appears in Day 1
✅ Verify: Activity card displays all details
```

#### Step 3.3: Add Multiple Activities
```
✅ Action: Add 2-3 more activities to Day 1
✅ Activities:
   - 12:00 - Lunch at beach shack
   - 16:00 - Fort Aguada visit
   - 19:00 - Sunset at beach

✅ Expected: All activities listed in order
✅ Verify: Time-based sorting
```

#### Step 3.4: Update Activity
```
✅ Action: Click edit on an activity
✅ Change: Update time or description
✅ Action: Save changes
✅ Expected: Activity updated
✅ Verify localStorage: Changes persisted
```

#### Step 3.5: Delete Activity
```
✅ Action: Click delete on an activity
✅ Action: Confirm deletion
✅ Expected: Activity removed
✅ Verify: Remaining activities still visible
```

#### Step 3.6: Add Activities to Day 2
```
✅ Action: Switch to Day 2
✅ Action: Add 2-3 activities
✅ Expected: Day 2 activities saved separately
✅ Verify: Day 1 activities unchanged
```

---

### Phase 4: Smart Tools

#### Step 4.1: Access Story Creator
```
✅ Action: Navigate to Smart Tools
✅ Action: Click "Trip Story Creator"
✅ Expected: Story creator interface loads
✅ Verify: Active trip loaded
```

#### Step 4.2: Generate AI Story (if API key configured)
```
✅ Action: Click "Generate Story with AI"
✅ Expected: 
   - Loading indicator
   - Story generated
   - Story text displayed

✅ If no API key:
   - Error message shown
   - Manual entry still works
```

#### Step 4.3: Manual Story Entry
```
✅ Action: Enter story manually
✅ Content:
   - Title: "My Amazing Goa Trip"
   - Story: "This was an unforgettable journey..."

✅ Expected: Text saved in form
```

#### Step 4.4: Upload Image
```
✅ Action: Click "Upload Image"
✅ Action: Select an image file
✅ Expected: 
   - Image preview shown
   - Image converted to base64

✅ Verify: Preview displays correctly
```

#### Step 4.5: Save Story
```
✅ Action: Click "Save Story"
✅ Expected:
   - Success message
   - Story saved to trip

✅ Verify localStorage:
   - Check: aiTripPlanner_stories
   - Verify: Story data with image
```

---

### Phase 5: Booking Features

#### Step 5.1: Test Hotel Finder
```
✅ Action: Navigate to Bookings
✅ Action: Click "Hotels" tab
✅ Expected: 
   - Hotels list displayed
   - Location-based data (if trip active)
   - Mock hotels for Goa

✅ Verify:
   - Hotel cards display
   - Prices shown
   - Ratings visible
   - Book button works
```

#### Step 5.2: Test Transport
```
✅ Action: Click "Transport" tab
✅ Expected:
   - Transport options displayed
   - Flights, trains, buses shown
   - Prices and times visible

✅ Verify: All transport types listed
```

#### Step 5.3: Test Restaurants
```
✅ Action: Click "Restaurants" tab
✅ Expected:
   - Restaurant list displayed
   - Cuisine types shown
   - Ratings visible

✅ Verify: Restaurant details complete
```

#### Step 5.4: Test Expense Splitter
```
✅ Action: Click "Expense Splitter" tab
✅ Action: Add expense
✅ Fill:
   - Description: "Hotel booking"
   - Amount: 5000
   - Split between: 2 people

✅ Expected: Per-person amount calculated
✅ Verify: Math is correct (5000/2 = 2500)
```

#### Step 5.5: Test Currency Converter
```
✅ Action: Click "Currency Converter" tab
✅ Action: Enter amount: 100 USD
✅ Action: Convert to INR
✅ Expected: Conversion displayed
✅ Verify: Exchange rate applied
```

---

### Phase 6: Saved Trips & Stories

#### Step 6.1: View Saved Trips
```
✅ Action: Navigate to Saved Trips
✅ Action: Click "Trips" tab
✅ Expected:
   - All created trips listed
   - Trip cards display correctly
   - Trip count shown

✅ Verify: Created trip appears
```

#### Step 6.2: View Saved Stories
```
✅ Action: Click "Stories" tab
✅ Expected:
   - All saved stories listed
   - Story cards with images
   - Story count shown

✅ Verify: Created story appears
```

#### Step 6.3: View Story Details
```
✅ Action: Click on a story card
✅ Expected:
   - Full story displayed
   - Image shown
   - All details visible

✅ Verify: Content matches saved data
```

#### Step 6.4: Delete Story
```
✅ Action: Click delete on a story
✅ Action: Confirm deletion
✅ Expected: Story removed from list
✅ Verify localStorage: Story deleted
```

#### Step 6.5: Delete Trip
```
✅ Action: Click delete on a trip
✅ Action: Confirm deletion
✅ Expected:
   - Trip removed
   - Associated day plans deleted
   - Associated stories deleted (cascade)

✅ Verify localStorage:
   - Trip removed from aiTripPlanner_trips
   - Day plans removed
   - Stories removed
```

---

### Phase 7: Backend Integration (Optional)

#### Step 7.1: Set Up Supabase
```
✅ Action: Create Supabase project
✅ Action: Run supabase-schema.sql
✅ Action: Create storage buckets
✅ Action: Configure .env
✅ Action: Set VITE_BACKEND_MODE=supabase
✅ Action: Restart dev server
```

#### Step 7.2: Test Authentication
```
✅ Action: Navigate to /auth
✅ Action: Sign up with email/password
✅ Expected:
   - Account created
   - Redirect to overview
   - Session persisted

✅ Verify:
   - User in Supabase Auth
   - Profile in users table
```

#### Step 7.3: Test Data Sync
```
✅ Action: Create a trip
✅ Expected:
   - Trip saved to Supabase
   - Trip appears in trips table
   - user_id correctly set

✅ Verify Supabase:
   - Check trips table
   - Verify RLS policies work
```

#### Step 7.4: Test Image Upload
```
✅ Action: Create story with image
✅ Expected:
   - Image uploaded to story-images bucket
   - URL saved in stories table
   - Image accessible via URL

✅ Verify Supabase Storage:
   - Check story-images bucket
   - Verify user folder structure
```

#### Step 7.5: Test Cross-Device
```
✅ Action: Sign in on different browser
✅ Expected:
   - Same trips visible
   - Same data accessible
   - Real-time sync

✅ Verify: Data consistency
```

---

## ✅ Test Results Template

### Test Summary
```
Date: ___________
Tester: ___________
Mode: LOCAL / SUPABASE
Browser: ___________
```

### Results

| Phase | Test | Status | Notes |
|-------|------|--------|-------|
| 1.1 | App Launch | ✅ / ❌ | |
| 1.2 | Navigation | ✅ / ❌ | |
| 1.3 | Responsive | ✅ / ❌ | |
| 2.1 | Create Trip | ✅ / ❌ | |
| 2.2 | View Trip | ✅ / ❌ | |
| 2.3 | Update Trip | ✅ / ❌ | |
| 3.1 | Day Planner | ✅ / ❌ | |
| 3.2 | Add Activity | ✅ / ❌ | |
| 3.3 | Multiple Activities | ✅ / ❌ | |
| 3.4 | Update Activity | ✅ / ❌ | |
| 3.5 | Delete Activity | ✅ / ❌ | |
| 4.1 | Story Creator | ✅ / ❌ | |
| 4.2 | AI Generation | ✅ / ❌ | |
| 4.3 | Manual Entry | ✅ / ❌ | |
| 4.4 | Image Upload | ✅ / ❌ | |
| 4.5 | Save Story | ✅ / ❌ | |
| 5.1 | Hotel Finder | ✅ / ❌ | |
| 5.2 | Transport | ✅ / ❌ | |
| 5.3 | Restaurants | ✅ / ❌ | |
| 5.4 | Expense Splitter | ✅ / ❌ | |
| 5.5 | Currency Converter | ✅ / ❌ | |
| 6.1 | Saved Trips | ✅ / ❌ | |
| 6.2 | Saved Stories | ✅ / ❌ | |
| 6.3 | Story Details | ✅ / ❌ | |
| 6.4 | Delete Story | ✅ / ❌ | |
| 6.5 | Delete Trip | ✅ / ❌ | |

### Issues Found
```
1. ___________________________________________
2. ___________________________________________
3. ___________________________________________
```

### Overall Status
- [ ] All tests passed
- [ ] Minor issues (list above)
- [ ] Major issues (list above)
- [ ] Ready for production

---

## 🔍 Debugging Tips

### Check Console
```javascript
// Open DevTools (F12)
// Check Console tab for errors
// Look for:
- Network errors
- JavaScript errors
- Warning messages
```

### Check localStorage
```javascript
// DevTools → Application → Local Storage
// Check these keys:
- aiTripPlanner_trips
- aiTripPlanner_activeTrip
- aiTripPlanner_dayPlans
- aiTripPlanner_stories
```

### Check Network
```javascript
// DevTools → Network tab
// Verify:
- API calls succeed
- Images load
- No 404 errors
```

### Check State
```javascript
// In React DevTools:
// Inspect components
// Check context values
// Verify state updates
```

---

## 🎯 Success Criteria

### Minimum Viable Product (MVP)
- ✅ Create trip works
- ✅ View trip works
- ✅ Add day plans works
- ✅ Save story works
- ✅ Data persists

### Full Feature Set
- ✅ All navigation works
- ✅ All CRUD operations work
- ✅ All smart tools work
- ✅ All booking features work
- ✅ Data persistence works
- ✅ No critical bugs

### Production Ready
- ✅ Backend integration works
- ✅ Authentication works
- ✅ Data security enforced
- ✅ Error handling robust
- ✅ Performance acceptable
- ✅ Documentation complete

---

## 🚀 Quick Test Commands

### Start Dev Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Check for Errors
```bash
# Check console in browser
# Look for red errors
```

---

## 📊 Performance Benchmarks

### Page Load Times
- Home: < 2s
- Overview: < 1s
- Day Planner: < 1s
- Smart Tools: < 1s

### Operation Times
- Create Trip: < 500ms
- Add Activity: < 300ms
- Save Story: < 1s
- Image Upload: < 3s

---

## ✅ Final Checklist

Before marking as complete:
- [ ] All phases tested
- [ ] All tests passed
- [ ] No critical bugs
- [ ] Data persists correctly
- [ ] Performance acceptable
- [ ] Ready for next phase

---

**Test Flow Version**: 1.0
**Last Updated**: 2024-12-15
**Status**: Ready for Testing
