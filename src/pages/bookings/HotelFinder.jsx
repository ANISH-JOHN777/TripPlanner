import { useTripContext } from '../../context/TripContext';
import { Navigate, Link } from 'react-router-dom';
import './HotelFinder.css';

const HotelFinder = () => {
    const { activeTrip } = useTripContext();

    if (!activeTrip) {
        return <Navigate to="/trip-creator" replace />;
    }

    // Calculate trip duration
    const calculateNights = () => {
        if (!activeTrip.startDate || !activeTrip.endDate) return 0;
        const start = new Date(activeTrip.startDate);
        const end = new Date(activeTrip.endDate);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const nights = calculateNights();

    return (
        <div className="hotel-finder-page">
            <div className="module-header">
                <div>
                    <h1>🏨 Hotel Finder</h1>
                    <p className="module-subtitle">Find hotels in {activeTrip.destination}</p>
                </div>
                <Link to="/bookings" className="btn btn-secondary">
                    Back to Bookings
                </Link>
            </div>

            <div className="search-criteria">
                <h3>Search Criteria</h3>
                <div className="criteria-grid">
                    <div className="criteria-item">
                        <span className="criteria-label">Destination:</span>
                        <span className="criteria-value">{activeTrip.destination}</span>
                    </div>
                    <div className="criteria-item">
                        <span className="criteria-label">Check-in:</span>
                        <span className="criteria-value">{activeTrip.startDate}</span>
                    </div>
                    <div className="criteria-item">
                        <span className="criteria-label">Check-out:</span>
                        <span className="criteria-value">{activeTrip.endDate}</span>
                    </div>
                    <div className="criteria-item">
                        <span className="criteria-label">Nights:</span>
                        <span className="criteria-value">{nights}</span>
                    </div>
                    <div className="criteria-item">
                        <span className="criteria-label">Guests:</span>
                        <span className="criteria-value">{activeTrip.travelers || 1}</span>
                    </div>
                </div>
            </div>

            <div className="placeholder-content">
                <div className="placeholder-icon">🏨</div>
                <h2>Hotel Search Coming Soon</h2>
                <p>This feature will help you find and compare hotels for your trip.</p>
                <div className="feature-list">
                    <div className="feature-item">✓ Search hotels by location</div>
                    <div className="feature-item">✓ Compare prices and amenities</div>
                    <div className="feature-item">✓ Read reviews and ratings</div>
                    <div className="feature-item">✓ Book directly from the app</div>
                </div>
            </div>
        </div>
    );
};

export default HotelFinder;
