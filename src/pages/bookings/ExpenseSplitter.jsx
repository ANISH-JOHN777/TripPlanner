import { useTripContext } from '../../context/TripContext';
import { Navigate, Link } from 'react-router-dom';
import './ExpenseSplitter.css';

const ExpenseSplitter = () => {
    const { activeTrip } = useTripContext();

    if (!activeTrip) {
        return <Navigate to="/trip-creator" replace />;
    }

    return (
        <div className="expense-splitter-page">
            <div className="module-header">
                <div>
                    <h1>💰 Expense Splitter</h1>
                    <p className="module-subtitle">Split expenses for {activeTrip.destination}</p>
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
                        <span className="criteria-label">Travel Type:</span>
                        <span className="criteria-value">
                            {activeTrip.travelType === 'solo' && '🧳 Solo'}
                            {activeTrip.travelType === 'couple' && '💑 Couple'}
                            {activeTrip.travelType === 'group' && '👥 Group'}
                        </span>
                    </div>
                    <div className="criteria-item">
                        <span className="criteria-label">Total Travelers:</span>
                        <span className="criteria-value">{activeTrip.travelers || 1}</span>
                    </div>
                    <div className="criteria-item">
                        <span className="criteria-label">Trip Dates:</span>
                        <span className="criteria-value">
                            {activeTrip.startDate} to {activeTrip.endDate}
                        </span>
                    </div>
                </div>
            </div>

            <div className="placeholder-content">
                <div className="placeholder-icon">💰</div>
                <h2>Expense Splitter Coming Soon</h2>
                <p>This feature will help you track and split expenses with your travel companions.</p>
                <div className="feature-list">
                    <div className="feature-item">✓ Add and categorize expenses</div>
                    <div className="feature-item">✓ Split bills equally or by custom amounts</div>
                    <div className="feature-item">✓ Track who owes whom</div>
                    <div className="feature-item">✓ Generate expense reports</div>
                    <div className="feature-item">✓ Settle up with payment tracking</div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseSplitter;
