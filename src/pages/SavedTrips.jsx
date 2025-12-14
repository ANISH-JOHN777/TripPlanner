import { useTripContext } from '../context/TripContext';
import { useNavigate } from 'react-router-dom';
import './SavedTrips.css';

const SavedTrips = () => {
    const { trips, activeTrip, selectTrip, deleteTrip } = useTripContext();
    const navigate = useNavigate();

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    // Calculate trip duration
    const calculateDuration = (startDate, endDate) => {
        if (!startDate || !endDate) return 'N/A';
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return `${diffDays} ${diffDays === 1 ? 'Day' : 'Days'}`;
    };

    // Get travel type display
    const getTravelTypeInfo = (travelType) => {
        const types = {
            solo: { icon: '🧳', label: 'Solo' },
            couple: { icon: '💑', label: 'Couple' },
            group: { icon: '👥', label: 'Group' },
        };
        return types[travelType] || { icon: '✈️', label: 'Trip' };
    };

    // Handle trip selection
    const handleSelectTrip = (tripId) => {
        selectTrip(tripId);
        navigate('/overview');
    };

    // Handle trip deletion
    const handleDeleteTrip = (tripId) => {
        const tripToDelete = trips.find(t => t.id === tripId);
        if (!tripToDelete) return;

        const confirmMessage = `Are you sure you want to delete the trip to ${tripToDelete.destination}?`;
        if (!window.confirm(confirmMessage)) return;

        const isActiveTrip = activeTrip?.id === tripId;

        // Delete the trip
        deleteTrip(tripId);

        // If we deleted the active trip
        if (isActiveTrip) {
            const remainingTrips = trips.filter(t => t.id !== tripId);

            if (remainingTrips.length > 0) {
                // Switch to the first remaining trip
                selectTrip(remainingTrips[0].id);
                navigate('/overview');
            } else {
                // No trips left, redirect to TripCreator
                navigate('/trip-creator');
            }
        }
    };

    return (
        <div className="saved-trips-page">
            <div className="trips-header">
                <div>
                    <h1>Saved Trips</h1>
                    <p className="trips-subtitle">
                        {trips.length === 0
                            ? 'Start planning your first adventure!'
                            : `You have ${trips.length} trip${trips.length !== 1 ? 's' : ''} saved`}
                    </p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/trip-creator')}>
                    + Create New Trip
                </button>
            </div>

            {trips.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">✈️</div>
                    <h2>No Trips Yet</h2>
                    <p>Start planning your dream vacation with our trip planner</p>
                    <button className="btn btn-primary btn-large" onClick={() => navigate('/trip-creator')}>
                        Create Your First Trip
                    </button>
                </div>
            ) : (
                <div className="trips-grid">
                    {trips.map(trip => {
                        const isActive = activeTrip?.id === trip.id;
                        const travelTypeInfo = getTravelTypeInfo(trip.travelType);
                        const duration = calculateDuration(trip.startDate, trip.endDate);

                        return (
                            <div
                                key={trip.id}
                                className={`trip-card ${isActive ? 'active' : ''}`}
                            >
                                {isActive && (
                                    <div className="active-badge">
                                        <span className="badge-icon">✓</span>
                                        Active Trip
                                    </div>
                                )}

                                <div className="trip-card-header">
                                    <div className="travel-type-badge">
                                        <span className="badge-icon">{travelTypeInfo.icon}</span>
                                        <span className="badge-label">{travelTypeInfo.label}</span>
                                    </div>
                                    <div className="status-badge status-badge-small">
                                        {trip.status || 'planned'}
                                    </div>
                                </div>

                                <div className="trip-card-content">
                                    <h2 className="trip-destination">{trip.destination}</h2>

                                    <div className="trip-details">
                                        <div className="detail-item">
                                            <span className="detail-icon">📅</span>
                                            <div className="detail-text">
                                                <span className="detail-label">Dates</span>
                                                <span className="detail-value">
                                                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="detail-item">
                                            <span className="detail-icon">🗓️</span>
                                            <div className="detail-text">
                                                <span className="detail-label">Duration</span>
                                                <span className="detail-value">{duration}</span>
                                            </div>
                                        </div>

                                        <div className="detail-item">
                                            <span className="detail-icon">👥</span>
                                            <div className="detail-text">
                                                <span className="detail-label">Travelers</span>
                                                <span className="detail-value">{trip.travelers || 1}</span>
                                            </div>
                                        </div>

                                        {trip.dayPlans && Object.keys(trip.dayPlans).length > 0 && (
                                            <div className="detail-item">
                                                <span className="detail-icon">📋</span>
                                                <div className="detail-text">
                                                    <span className="detail-label">Activities</span>
                                                    <span className="detail-value">
                                                        {Object.values(trip.dayPlans).reduce((total, day) => total + day.length, 0)} planned
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="trip-card-actions">
                                    {!isActive && (
                                        <button
                                            className="btn btn-primary btn-full"
                                            onClick={() => handleSelectTrip(trip.id)}
                                        >
                                            Select Trip
                                        </button>
                                    )}
                                    {isActive && (
                                        <button
                                            className="btn btn-secondary btn-full"
                                            onClick={() => navigate('/overview')}
                                        >
                                            View Details
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-danger btn-full"
                                        onClick={() => handleDeleteTrip(trip.id)}
                                    >
                                        Delete Trip
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SavedTrips;
