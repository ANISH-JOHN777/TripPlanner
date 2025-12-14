import { useTripContext } from '../../context/TripContext';
import { Navigate, Link } from 'react-router-dom';
import './Restaurants.css';

const Restaurants = () => {
    const { activeTrip } = useTripContext();

    if (!activeTrip) {
        return <Navigate to="/trip-creator" replace />;
    }

    return (
        <div className="restaurants-page">
            <div className="module-header">
                <div>
                    <h1>🍽️ Restaurants</h1>
                    <p className="module-subtitle">Discover dining in {activeTrip.destination}</p>
                </div>
                <Link to="/bookings" className="btn btn-secondary">
                    Back to Bookings
                </Link>
            </div>

            <div className="search-criteria">
                <h3>Search Criteria</h3>
                <div className="criteria-grid">
                    <div className="criteria-item">
                        <span className="criteria-label">Location:</span>
                        <span className="criteria-value">{activeTrip.destination}</span>
                    </div>
                    <div className="criteria-item">
                        <span className="criteria-label">Party Size:</span>
                        <span className="criteria-value">{activeTrip.travelers || 1} people</span>
                    </div>
                    <div className="criteria-item">
                        <span className="criteria-label">Trip Duration:</span>
                        <span className="criteria-value">
                            {activeTrip.startDate} to {activeTrip.endDate}
                        </span>
                    </div>
                </div>
            </div>

            <div className="placeholder-content">
                <div className="placeholder-icon">🍽️</div>
                <h2>Restaurant Finder Coming Soon</h2>
                <p>This feature will help you discover the best dining options for your trip.</p>
                <div className="feature-list">
                    <div className="feature-item">✓ Search restaurants by cuisine</div>
                    <div className="feature-item">✓ Read reviews and ratings</div>
                    <div className="feature-item">✓ View menus and prices</div>
                    <div className="feature-item">✓ Make reservations</div>
                    <div className="feature-item">✓ Get directions and contact info</div>
                </div>
            </div>
        </div>
    );
};

export default Restaurants;
