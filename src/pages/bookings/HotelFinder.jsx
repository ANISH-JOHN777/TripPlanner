import { useTripContext } from '../../context/TripContext';
import { Navigate, Link } from 'react-router-dom';
import { Hotel, MapPin, Star, Wifi, Utensils } from 'lucide-react';
import { getMockHotels } from '../../utils/mockData';
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

    // Get location-based mock hotels
    const hotels = getMockHotels(activeTrip.destination);

    return (
        <div className="hotel-finder-page">
            <div className="module-header">
                <div>
                    <h1><Hotel size={32} /> Hotel Finder</h1>
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
                        <span className="criteria-value">{new Date(activeTrip.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="criteria-item">
                        <span className="criteria-label">Check-out:</span>
                        <span className="criteria-value">{new Date(activeTrip.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
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

            <div className="results-section">
                <div className="results-header">
                    <h3>{hotels.length} Hotels Found in {activeTrip.destination}</h3>
                    <p className="results-note">Showing available hotels for your dates</p>
                </div>

                <div className="hotels-grid">
                    {hotels.map(hotel => (
                        <div key={hotel.id} className="hotel-card">
                            <div className="hotel-image">
                                <div className="hotel-type-badge">{hotel.type}</div>
                                <div className="hotel-placeholder-img">
                                    <Hotel size={48} />
                                </div>
                            </div>
                            <div className="hotel-details">
                                <div className="hotel-header">
                                    <h4>{hotel.name}</h4>
                                    <div className="hotel-rating">
                                        <Star size={16} fill="currentColor" />
                                        <span>{hotel.rating}</span>
                                    </div>
                                </div>
                                <div className="hotel-location">
                                    <MapPin size={14} />
                                    <span>{hotel.location}</span>
                                </div>
                                <div className="hotel-amenities">
                                    {hotel.amenities.slice(0, 4).map((amenity, index) => (
                                        <span key={index} className="amenity-tag">{amenity}</span>
                                    ))}
                                </div>
                                <div className="hotel-footer">
                                    <div className="hotel-price">
                                        <span className="price-label">Per night</span>
                                        <span className="price-amount">₹{hotel.price.toLocaleString('en-IN')}</span>
                                        <span className="total-price">₹{(hotel.price * nights).toLocaleString('en-IN')} total</span>
                                    </div>
                                    <button className="btn btn-primary btn-sm">View Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HotelFinder;
