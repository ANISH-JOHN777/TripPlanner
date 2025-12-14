import { useState } from 'react';
import { useTripContext } from '../context/TripContext';
import './Home.css';

const Home = ({ onNavigate }) => {
    const { trips } = useTripContext();
    const [searchQuery, setSearchQuery] = useState('');

    const featuredDestinations = [
        {
            id: 1,
            name: 'Paris, France',
            image: '🗼',
            description: 'The City of Light awaits',
            popular: true,
        },
        {
            id: 2,
            name: 'Tokyo, Japan',
            image: '🗾',
            description: 'Where tradition meets future',
            popular: true,
        },
        {
            id: 3,
            name: 'Bali, Indonesia',
            image: '🏝️',
            description: 'Tropical paradise',
            popular: true,
        },
        {
            id: 4,
            name: 'New York, USA',
            image: '🗽',
            description: 'The city that never sleeps',
            popular: false,
        },
        {
            id: 5,
            name: 'Dubai, UAE',
            image: '🏙️',
            description: 'Modern luxury destination',
            popular: false,
        },
        {
            id: 6,
            name: 'Rome, Italy',
            image: '🏛️',
            description: 'Ancient history comes alive',
            popular: true,
        },
    ];

    const handleStartPlanning = () => {
        onNavigate('planner');
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Plan Your Perfect Trip with <span className="gradient-text">AI</span>
                    </h1>
                    <p className="hero-subtitle">
                        Let artificial intelligence create personalized itineraries tailored to your preferences,
                        budget, and travel style. Your dream vacation is just a few clicks away.
                    </p>
                    <div className="hero-actions">
                        <button className="btn btn-primary btn-large" onClick={handleStartPlanning}>
                            Start Planning
                            <span className="btn-icon">✈️</span>
                        </button>
                        <button className="btn btn-secondary btn-large" onClick={() => onNavigate('trips')}>
                            View My Trips
                            <span className="btn-icon">📋</span>
                        </button>
                    </div>
                </div>
                <div className="hero-stats">
                    <div className="stat-card">
                        <div className="stat-number">{trips.length}</div>
                        <div className="stat-label">Trips Planned</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">50+</div>
                        <div className="stat-label">Destinations</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">AI</div>
                        <div className="stat-label">Powered</div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title">Why Choose AI Trip Planner?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🤖</div>
                        <h3>AI-Powered Planning</h3>
                        <p>Advanced AI creates personalized itineraries based on your preferences and budget</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Instant Itineraries</h3>
                        <p>Get detailed day-by-day plans in seconds, not hours of research</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💰</div>
                        <h3>Budget Optimization</h3>
                        <p>Smart recommendations that match your budget without compromising experience</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>Personalized Experiences</h3>
                        <p>Tailored suggestions based on your interests and travel style</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🌍</div>
                        <h3>Global Coverage</h3>
                        <p>Explore destinations worldwide with local insights and tips</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Easy to Use</h3>
                        <p>Simple interface that makes trip planning fun and effortless</p>
                    </div>
                </div>
            </section>

            {/* Featured Destinations */}
            <section className="destinations-section">
                <h2 className="section-title">Popular Destinations</h2>
                <div className="destinations-grid">
                    {featuredDestinations.map(dest => (
                        <div key={dest.id} className="destination-card" onClick={handleStartPlanning}>
                            <div className="destination-image">{dest.image}</div>
                            <div className="destination-info">
                                <h3>{dest.name}</h3>
                                <p>{dest.description}</p>
                                {dest.popular && <span className="badge">Popular</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to Start Your Adventure?</h2>
                    <p>Join thousands of travelers who trust AI to plan their perfect trips</p>
                    <button className="btn btn-primary btn-large" onClick={handleStartPlanning}>
                        Create Your First Trip
                        <span className="btn-icon">🚀</span>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
