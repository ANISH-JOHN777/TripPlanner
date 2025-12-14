import { useTripContext } from '../context/TripContext';
import { Navigate, Link } from 'react-router-dom';
import './Bookings.css';

const Bookings = () => {
    const { activeTrip } = useTripContext();

    // Redirect if no active trip
    if (!activeTrip) {
        return <Navigate to="/trip-creator" replace />;
    }

    const modules = [
        {
            id: 'hotels',
            title: 'Hotel Finder',
            icon: '🏨',
            description: 'Find and book hotels for your trip',
            path: '/bookings/hotels',
            color: '#667eea',
        },
        {
            id: 'transport',
            title: 'Transport',
            icon: '✈️',
            description: 'Book flights, trains, and buses',
            path: '/bookings/transport',
            color: '#48bb78',
        },
        {
            id: 'restaurants',
            title: 'Restaurants',
            icon: '🍽️',
            description: 'Discover dining options',
            path: '/bookings/restaurants',
            color: '#ed8936',
        },
        {
            id: 'expenses',
            title: 'Expense Splitter',
            icon: '💰',
            description: 'Split expenses with travel companions',
            path: '/bookings/expenses',
            color: '#9f7aea',
        },
        {
            id: 'currency',
            title: 'Currency Converter',
            icon: '💱',
            description: 'Convert currencies for your trip',
            path: '/bookings/currency',
            color: '#38b2ac',
        },
    ];

    return (
        <div className="bookings-page">
            <div className="bookings-header">
                <div>
                    <h1>Bookings & Essentials</h1>
                    <p className="bookings-subtitle">
                        Manage bookings and essentials for {activeTrip.destination}
                    </p>
                </div>
                <Link to="/overview" className="btn btn-secondary">
                    Back to Overview
                </Link>
            </div>

            <div className="modules-grid">
                {modules.map(module => (
                    <Link
                        key={module.id}
                        to={module.path}
                        className="module-card"
                        style={{ '--module-color': module.color }}
                    >
                        <div className="module-icon">{module.icon}</div>
                        <div className="module-content">
                            <h3>{module.title}</h3>
                            <p>{module.description}</p>
                        </div>
                        <div className="module-arrow">→</div>
                    </Link>
                ))}
            </div>

            <div className="trip-info-banner">
                <div className="info-item">
                    <span className="info-label">Destination:</span>
                    <span className="info-value">{activeTrip.destination}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Dates:</span>
                    <span className="info-value">
                        {activeTrip.startDate} to {activeTrip.endDate}
                    </span>
                </div>
                <div className="info-item">
                    <span className="info-label">Travelers:</span>
                    <span className="info-value">{activeTrip.travelers || 1}</span>
                </div>
            </div>
        </div>
    );
};

export default Bookings;
