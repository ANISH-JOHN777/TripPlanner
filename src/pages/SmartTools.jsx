import { useTripContext } from '../context/TripContext';
import { Navigate, Link } from 'react-router-dom';
import './SmartTools.css';

const SmartTools = () => {
    const { activeTrip } = useTripContext();

    // Show message if no active trip
    if (!activeTrip) {
        return (
            <div className="smart-tools-page">
                <div className="no-trip-message">
                    <div className="message-icon">🤖</div>
                    <h2>No Active Trip</h2>
                    <p>You need to create a trip first to use Smart Tools & AI features.</p>
                    <Link to="/trip-creator" className="btn btn-primary btn-large">
                        Create Your First Trip
                    </Link>
                </div>
            </div>
        );
    }

    const tools = [
        {
            id: 'packing',
            title: 'Packing List',
            icon: '🎒',
            description: 'AI-generated packing list for your trip',
            path: '/smart-tools/packing',
            color: '#667eea',
        },
        {
            id: 'safety',
            title: 'Safety Alerts',
            icon: '🛡️',
            description: 'Safety tips and alerts for your destination',
            path: '/smart-tools/safety',
            color: '#f56565',
        },
        {
            id: 'emergency',
            title: 'Emergency Help',
            icon: '🚨',
            description: 'Emergency contacts and assistance',
            path: '/smart-tools/emergency',
            color: '#ed8936',
        },
        {
            id: 'ai-chat',
            title: 'AI Chat Planner',
            icon: '💬',
            description: 'Chat with AI to plan your trip',
            path: '/smart-tools/ai-chat',
            color: '#48bb78',
        },
        {
            id: 'story',
            title: 'Trip Story Creator',
            icon: '📖',
            description: 'Create and share your trip story',
            path: '/smart-tools/story',
            color: '#9f7aea',
        },
    ];

    return (
        <div className="smart-tools-page">
            <div className="tools-header">
                <div>
                    <h1>Smart Tools & AI</h1>
                    <p className="tools-subtitle">
                        AI-powered tools for {activeTrip.destination}
                    </p>
                </div>
                <Link to="/overview" className="btn btn-secondary">
                    Back to Overview
                </Link>
            </div>

            <div className="tools-grid">
                {tools.map(tool => (
                    <Link
                        key={tool.id}
                        to={tool.path}
                        className="tool-card"
                        style={{ '--tool-color': tool.color }}
                    >
                        <div className="tool-icon">{tool.icon}</div>
                        <div className="tool-content">
                            <h3>{tool.title}</h3>
                            <p>{tool.description}</p>
                        </div>
                        <div className="tool-arrow">→</div>
                    </Link>
                ))}
            </div>

            <div className="ai-badge">
                <span className="badge-icon">✨</span>
                <span className="badge-text">Powered by AI</span>
            </div>
        </div>
    );
};

export default SmartTools;
