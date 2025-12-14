import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navItems = [
        { path: '/overview', label: 'Overview', icon: '🏠' },
        { path: '/trip-creator', label: 'Create Trip', icon: '✨' },
        { path: '/day-planner', label: 'Day Planner', icon: '📅' },
        { path: '/bookings', label: 'Bookings', icon: '🎫' },
        { path: '/smart-tools', label: 'Smart Tools', icon: '🤖' },
        { path: '/saved-trips', label: 'Saved Trips', icon: '💾' },
        { path: '/settings', label: 'Settings', icon: '⚙️' },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <span className="brand-icon">🌍</span>
                    <span className="brand-name">WanderAI</span>
                </div>

                <div className="navbar-links">
                    {navItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
