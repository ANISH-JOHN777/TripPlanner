import { useTripContext } from '../../context/TripContext';
import { Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import './Transport.css';

const Transport = () => {
    const { activeTrip } = useTripContext();
    const [transportType, setTransportType] = useState('flights');

    if (!activeTrip) {
        return <Navigate to="/trip-creator" replace />;
    }

    const transportTypes = [
        { id: 'flights', label: 'Flights', icon: '✈️' },
        { id: 'trains', label: 'Trains', icon: '🚆' },
        { id: 'buses', label: 'Buses', icon: '🚌' },
    ];

    return (
        <div className="transport-page">
            <div className="module-header">
                <div>
                    <h1>✈️ Transport</h1>
                    <p className="module-subtitle">Book transport for {activeTrip.destination}</p>
                </div>
                <Link to="/bookings" className="btn btn-secondary">
                    Back to Bookings
                </Link>
            </div>

            <div className="transport-tabs">
                {transportTypes.map(type => (
                    <button
                        key={type.id}
                        className={`transport-tab ${transportType === type.id ? 'active' : ''}`}
                        onClick={() => setTransportType(type.id)}
                    >
                        <span className="tab-icon">{type.icon}</span>
                        <span className="tab-label">{type.label}</span>
                    </button>
                ))}
            </div>

            <div className="search-criteria">
                <h3>Travel Details</h3>
                <div className="criteria-grid">
                    <div className="criteria-item">
                        <span className="criteria-label">Destination:</span>
                        <span className="criteria-value">{activeTrip.destination}</span>
                    </div>
                    <div className="criteria-item">
                        <span className="criteria-label">Departure Date:</span>
                        <span className="criteria-value">{activeTrip.startDate}</span>
                    </div>
                    <div className="criteria-item">
                        <span className="criteria-label">Return Date:</span>
                        <span className="criteria-value">{activeTrip.endDate}</span>
                    </div>
                    <div className="criteria-item">
                        <span className="criteria-label">Passengers:</span>
                        <span className="criteria-value">{activeTrip.travelers || 1}</span>
                    </div>
                </div>
            </div>

            <div className="placeholder-content">
                <div className="placeholder-icon">
                    {transportType === 'flights' && '✈️'}
                    {transportType === 'trains' && '🚆'}
                    {transportType === 'buses' && '🚌'}
                </div>
                <h2>{transportTypes.find(t => t.id === transportType)?.label} Search Coming Soon</h2>
                <p>This feature will help you find and book {transportType} for your trip.</p>
                <div className="feature-list">
                    <div className="feature-item">✓ Search available options</div>
                    <div className="feature-item">✓ Compare prices and timings</div>
                    <div className="feature-item">✓ View seat availability</div>
                    <div className="feature-item">✓ Book tickets directly</div>
                </div>
            </div>
        </div>
    );
};

export default Transport;
