import { useTripContext } from '../../context/TripContext';
import { Navigate, Link } from 'react-router-dom';
import './EmergencyHelp.css';

const EmergencyHelp = () => {
    const { activeTrip } = useTripContext();

    if (!activeTrip) {
        return <Navigate to="/trip-creator" replace />;
    }

    const emergencyContacts = [
        { service: 'Police', number: '100', icon: '👮' },
        { service: 'Ambulance', number: '102', icon: '🚑' },
        { service: 'Fire', number: '101', icon: '🚒' },
        { service: 'Women Helpline', number: '1091', icon: '👩' },
        { service: 'Tourist Helpline', number: '1363', icon: '🗺️' },
        { service: 'Disaster Management', number: '108', icon: '⚠️' },
    ];

    const quickActions = [
        { action: 'Call Emergency', icon: '📞', color: '#f56565' },
        { action: 'Share Location', icon: '📍', color: '#ed8936' },
        { action: 'Contact Embassy', icon: '🏛️', color: '#48bb78' },
        { action: 'Medical Help', icon: '🏥', color: '#4299e1' },
    ];

    return (
        <div className="emergency-help-page">
            <div className="tool-header">
                <div>
                    <h1>🚨 Emergency Help</h1>
                    <p className="tool-subtitle">Emergency assistance for {activeTrip.destination}</p>
                </div>
                <Link to="/smart-tools" className="btn btn-secondary">
                    Back to Smart Tools
                </Link>
            </div>

            <div className="emergency-banner">
                <div className="banner-icon">🚨</div>
                <div className="banner-content">
                    <h3>In case of emergency, stay calm and call the appropriate number</h3>
                    <p>All emergency services in India are available 24/7</p>
                </div>
            </div>

            <div className="quick-actions-section">
                <h3>Quick Actions</h3>
                <div className="quick-actions-grid">
                    {quickActions.map((action, index) => (
                        <button
                            key={index}
                            className="quick-action-btn"
                            style={{ '--action-color': action.color }}
                        >
                            <span className="action-icon">{action.icon}</span>
                            <span className="action-text">{action.action}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="emergency-contacts-section">
                <h3>Emergency Contacts</h3>
                <div className="contacts-grid">
                    {emergencyContacts.map((contact, index) => (
                        <div key={index} className="contact-card">
                            <div className="contact-icon">{contact.icon}</div>
                            <div className="contact-info">
                                <h4>{contact.service}</h4>
                                <a href={`tel:${contact.number}`} className="contact-number">
                                    {contact.number}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="trip-info-card">
                <h3>Your Trip Details</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <span className="info-label">Location:</span>
                        <span className="info-value">{activeTrip.destination}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Dates:</span>
                        <span className="info-value">
                            {activeTrip.startDate} to {activeTrip.endDate}
                        </span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Group Size:</span>
                        <span className="info-value">{activeTrip.travelers || 1} people</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyHelp;
