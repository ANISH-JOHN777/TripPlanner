import { createContext, useContext, useState, useEffect } from 'react';

const TripContext = createContext();

export const useTripContext = () => {
    const context = useContext(TripContext);
    if (!context) {
        throw new Error('useTripContext must be used within a TripProvider');
    }
    return context;
};

// LocalStorage keys
const TRIPS_STORAGE_KEY = 'aiTripPlanner_trips';
const ACTIVE_TRIP_STORAGE_KEY = 'aiTripPlanner_activeTrip';

export const TripProvider = ({ children }) => {
    const [trips, setTrips] = useState([]);
    const [activeTrip, setActiveTrip] = useState(null);
    const [loading, setLoading] = useState(false);

    // Load saved data on app initialization
    useEffect(() => {
        try {
            // Load trips array
            const savedTrips = localStorage.getItem(TRIPS_STORAGE_KEY);
            if (savedTrips) {
                const parsedTrips = JSON.parse(savedTrips);
                setTrips(Array.isArray(parsedTrips) ? parsedTrips : []);
            }

            // Load active trip
            const savedActiveTrip = localStorage.getItem(ACTIVE_TRIP_STORAGE_KEY);
            if (savedActiveTrip) {
                const parsedActiveTrip = JSON.parse(savedActiveTrip);
                setActiveTrip(parsedActiveTrip);
            }
        } catch (err) {
            console.error('Error loading saved data:', err);
            // Initialize with empty state if loading fails
            setTrips([]);
            setActiveTrip(null);
        }
    }, []);

    // Persist trips to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
        } catch (err) {
            console.error('Error saving trips:', err);
        }
    }, [trips]);

    // Persist activeTrip to localStorage whenever it changes
    useEffect(() => {
        try {
            if (activeTrip) {
                localStorage.setItem(ACTIVE_TRIP_STORAGE_KEY, JSON.stringify(activeTrip));
            } else {
                localStorage.removeItem(ACTIVE_TRIP_STORAGE_KEY);
            }
        } catch (err) {
            console.error('Error saving active trip:', err);
        }
    }, [activeTrip]);

    // Sync activeTrip with trips array when trips change
    // This ensures activeTrip always has the latest data
    useEffect(() => {
        if (activeTrip && trips.length > 0) {
            const updatedTrip = trips.find(t => t.id === activeTrip.id);
            if (updatedTrip) {
                // Only update if the data has actually changed
                const currentData = JSON.stringify(activeTrip);
                const newData = JSON.stringify(updatedTrip);
                if (currentData !== newData) {
                    setActiveTrip(updatedTrip);
                }
            } else {
                // Active trip was deleted from trips array
                setActiveTrip(null);
            }
        }
    }, [trips]);

    /**
     * Create a new trip and add it to the trips array
     * @param {Object} tripData - The trip data to create
     * @returns {Object} The created trip with generated ID and timestamp
     */
    const createTrip = (tripData) => {
        const newTrip = {
            ...tripData,
            id: `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        setTrips(prevTrips => [newTrip, ...prevTrips]);

        // Automatically set as active trip
        setActiveTrip(newTrip);

        return newTrip;
    };

    /**
     * Select a trip by ID and set it as the active trip
     * Ensures the active trip is always in sync with the trips array
     * @param {string} tripId - The ID of the trip to select
     * @returns {Object|null} The selected trip or null if not found
     */
    const selectTrip = (tripId) => {
        if (!tripId) {
            setActiveTrip(null);
            return null;
        }

        // Find the trip in the trips array (source of truth)
        const trip = trips.find(t => t.id === tripId);

        if (trip) {
            // Create a deep copy to avoid reference issues
            const tripCopy = JSON.parse(JSON.stringify(trip));
            setActiveTrip(tripCopy);
            return tripCopy;
        } else {
            console.warn(`Trip with ID ${tripId} not found`);
            return null;
        }
    };

    /**
     * Update the active trip with new data
     * @param {Object} updates - The updates to apply to the active trip
     * @returns {Object|null} The updated trip or null if no active trip
     */
    const updateActiveTrip = (updates) => {
        if (!activeTrip) {
            console.warn('No active trip to update');
            return null;
        }

        const updatedTrip = {
            ...activeTrip,
            ...updates,
            updatedAt: new Date().toISOString(),
        };

        // Update in trips array
        setTrips(prevTrips =>
            prevTrips.map(trip =>
                trip.id === activeTrip.id ? updatedTrip : trip
            )
        );

        // Update active trip
        setActiveTrip(updatedTrip);

        return updatedTrip;
    };

    /**
     * Delete a trip by ID
     * @param {string} tripId - The ID of the trip to delete
     */
    const deleteTrip = (tripId) => {
        setTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));

        // Clear active trip if it's the one being deleted
        if (activeTrip?.id === tripId) {
            setActiveTrip(null);
        }
    };

    /**
     * Get a trip by ID
     * @param {string} tripId - The ID of the trip to get
     * @returns {Object|undefined} The trip or undefined if not found
     */
    const getTripById = (tripId) => {
        return trips.find(trip => trip.id === tripId);
    };

    /**
     * Clear the active trip
     */
    const clearActiveTrip = () => {
        setActiveTrip(null);
    };

    /**
     * Clear all trips (useful for testing or reset)
     */
    const clearAllTrips = () => {
        setTrips([]);
        setActiveTrip(null);
        localStorage.removeItem(TRIPS_STORAGE_KEY);
        localStorage.removeItem(ACTIVE_TRIP_STORAGE_KEY);
    };

    const value = {
        // State
        trips,
        activeTrip,
        loading,
        setLoading,

        // Required functions
        createTrip,
        selectTrip,
        updateActiveTrip,

        // Additional utility functions
        deleteTrip,
        getTripById,
        clearActiveTrip,
        clearAllTrips,
    };

    return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};
