import { useTripContext } from '../context/TripContext';
import { Link, Navigate } from 'react-router-dom';
import './Overview.css';

const Overview = () => {
    const { activeTrip } = useTripContext();

    // Redirect to TripCreator if no active trip
    if (!activeTrip) {
        return <Navigate to="/trip-creator" replace />;
    }

    // Calculate total days
    const calculateTotalDays = () => {
        if (!activeTrip.startDate || !activeTrip.endDate) return 0;
        const start = new Date(activeTrip.startDate);
        const end = new Date(activeTrip.endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays + 1; // Include both start and end day
    };

    // Calculate days until trip starts
    const calculateDaysUntil = () => {
        if (!activeTrip.startDate) return null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const start = new Date(activeTrip.startDate);
        start.setHours(0, 0, 0, 0);
        const diffTime = start - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-IN', options);
    };

    // Get travel type display
    const getTravelTypeDisplay = () => {
        const types = {
            solo: { icon: '🧳', label: 'Solo Trip' },
            couple: { icon: '💑', label: 'Couple Trip' },
            group: { icon: '👥', label: 'Group Trip' },
        };
        return types[activeTrip.travelType] || { icon: '✈️', label: 'Trip' };
    };

    const totalDays = calculateTotalDays();
    const daysUntil = calculateDaysUntil();
    const travelTypeInfo = getTravelTypeDisplay();

    return (
        <div className="overview-page">
            {/* Hero Section */}
            <div className="overview-hero">
                <div className="hero-content">
                    <div className="trip-badge">
                        <span className="badge-icon">{travelTypeInfo.icon}</span>
                        <span className="badge-text">{travelTypeInfo.label}</span>
                    </div>
                    <h1 className="trip-destination">{activeTrip.destination}</h1>

                    {daysUntil !== null && daysUntil > 0 && (
                        <div className="countdown-banner">
                            <span className="countdown-icon">⏰</span>
                            <span className="countdown-text">
                                {daysUntil === 1 ? 'Starts tomorrow!' : `Starts in ${daysUntil} days`}
                            </span>
                        </div>
                    )}

                    {daysUntil !== null && daysUntil === 0 && (
                        <div className="countdown-banner today">
                            <span className="countdown-icon">🎉</span>
                            <span className="countdown-text">Your trip starts today!</span>
                        </div>
                    )}

                    {daysUntil !== null && daysUntil < 0 && (
                        <div className="countdown-banner ongoing">
                            <span className="countdown-icon">✈️</span>
                            <span className="countdown-text">Trip in progress</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Trip Details Cards */}
            <div className="trip-details-grid">
                {/* Start Date Card */}
                <div className="detail-card">
                    <div className="card-icon">📅</div>
                    <div className="card-content">
                        <div className="card-label">Start Date</div>
                        <div className="card-value">{formatDate(activeTrip.startDate)}</div>
                    </div>
                </div>

                {/* End Date Card */}
                <div className="detail-card">
                    <div className="card-icon">📅</div>
                    <div className="card-content">
                        <div className="card-label">End Date</div>
                        <div className="card-value">{formatDate(activeTrip.endDate)}</div>
                    </div>
                </div>

                {/* Total Days Card */}
                <div className="detail-card highlight">
                    <div className="card-icon">🗓️</div>
                    <div className="card-content">
                        <div className="card-label">Total Days</div>
                        <div className="card-value">{totalDays} {totalDays === 1 ? 'Day' : 'Days'}</div>
                    </div>
                </div>

                {/* Travelers Card */}
                <div className="detail-card">
                    <div className="card-icon">👥</div>
                    <div className="card-content">
                        <div className="card-label">Travelers</div>
                        <div className="card-value">{activeTrip.travelers || 1}</div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-section">
                <h2 className="section-title">Quick Actions</h2>
                <div className="actions-grid">
                    <Link to="/day-planner" className="action-card">
                        <div className="action-icon">📋</div>
                        <div className="action-content">
                            <h3>Plan Day-wise Itinerary</h3>
                            <p>Create detailed plans for each day of your trip</p>
                        </div>
                        <div className="action-arrow">→</div>
                    </Link>

                    <Link to="/saved-trips" className="action-card">
                        <div className="action-icon">💾</div>
                        <div className="action-content">
                            <h3>View Saved Trips</h3>
                            <p>Browse and manage all your saved trips</p>
                        </div>
                        <div className="action-arrow">→</div>
                    </Link>

                    <Link to="/trip-creator" className="action-card">
                        <div className="action-icon">✨</div>
                        <div className="action-content">
                            <h3>Create New Trip</h3>
                            <p>Start planning your next adventure</p>
                        </div>
                        <div className="action-arrow">→</div>
                    </Link>
                </div>
            </div>

            {/* Trip Info */}
            <div className="trip-info-section">
                <div className="info-card">
                    <h3>Trip Information</h3>
                    <div className="info-list">
                        <div className="info-row">
                            <span className="info-label">Destination:</span>
                            <span className="info-value">{activeTrip.destination}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Travel Type:</span>
                            <span className="info-value">{travelTypeInfo.label}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Status:</span>
                            <span className={`status-badge status-${activeTrip.status || 'planned'}`}>
                                {(activeTrip.status || 'planned').charAt(0).toUpperCase() + (activeTrip.status || 'planned').slice(1)}
                            </span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Created:</span>
                            <span className="info-value">
                                {activeTrip.createdAt ? formatDate(activeTrip.createdAt.split('T')[0]) : 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
