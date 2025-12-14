import { useTripContext } from '../../context/TripContext';
import { Navigate, Link } from 'react-router-dom';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
    const { activeTrip } = useTripContext();

    if (!activeTrip) {
        return <Navigate to="/trip-creator" replace />;
    }

    return (
        <div className="currency-converter-page">
            <div className="module-header">
                <div>
                    <h1>💱 Currency Converter</h1>
                    <p className="module-subtitle">Convert currency for {activeTrip.destination}</p>
                </div>
                <Link to="/bookings" className="btn btn-secondary">
                    Back to Bookings
                </Link>
            </div>

            <div className="search-criteria">
                <h3>Trip Information</h3>
                <div className="criteria-grid">
                    <div className="criteria-item">
                        <span className="criteria-label">Destination:</span>
                        <span className="criteria-value">{activeTrip.destination}</span>
                    </div>
                    <div className="criteria-item">
                        <span className="criteria-label">Trip Duration:</span>
                        <span className="criteria-value">
                            {activeTrip.startDate} to {activeTrip.endDate}
                        </span>
                    </div>
                    <div className="criteria-item">
                        <span className="criteria-label">Travelers:</span>
                        <span className="criteria-value">{activeTrip.travelers || 1}</span>
                    </div>
                </div>
            </div>

            <div className="placeholder-content">
                <div className="placeholder-icon">💱</div>
                <h2>Currency Converter Coming Soon</h2>
                <p>This feature will help you convert currencies for your trip expenses.</p>
                <div className="feature-list">
                    <div className="feature-item">✓ Real-time exchange rates</div>
                    <div className="feature-item">✓ Convert between multiple currencies</div>
                    <div className="feature-item">✓ Save favorite currency pairs</div>
                    <div className="feature-item">✓ View historical exchange rates</div>
                    <div className="feature-item">✓ Offline mode with cached rates</div>
                </div>
            </div>
        </div>
    );
};

export default CurrencyConverter;
