import { useTripContext } from '../../context/TripContext';
import { Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Plane, Train, Bus, Clock, IndianRupee, MapPin } from 'lucide-react';
import { getMockFlights, getMockTrains, getMockBuses } from '../../utils/mockData';
import './Transport.css';

const Transport = () => {
    const { activeTrip } = useTripContext();
    const [transportType, setTransportType] = useState('flights');

    if (!activeTrip) {
        return <Navigate to="/trip-creator" replace />;
    }

    const transportTypes = [
        { id: 'flights', label: 'Flights', icon: Plane },
        { id: 'trains', label: 'Trains', icon: Train },
        { id: 'buses', label: 'Buses', icon: Bus },
    ];

    // Get location-based mock data
    const flights = getMockFlights(activeTrip.destination);
    const trains = getMockTrains(activeTrip.destination);
    const buses = getMockBuses(activeTrip.destination);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="transport-page">
            <div className="module-header">
                <div>
                    <h1><Plane size={32} /> Transport</h1>
                    <p className="module-subtitle">Book transport to {activeTrip.destination}</p>
                </div>
                <Link to="/bookings" className="btn btn-secondary">
                    Back to Bookings
                </Link>
            </div>

            <div className="transport-tabs">
                {transportTypes.map(type => {
                    const Icon = type.icon;
                    return (
                        <button
                            key={type.id}
                            className={`transport-tab ${transportType === type.id ? 'active' : ''}`}
                            onClick={() => setTransportType(type.id)}
                        >
                            <Icon size={20} />
                            <span className="tab-label">{type.label}</span>
                        </button>
                    );
                })}
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
                        <span className="criteria-value">{formatDate(activeTrip.startDate)}</span>
                    </div>
                    <div className="criteria-item">
                        <span className="criteria-label">Return Date:</span>
                        <span className="criteria-value">{formatDate(activeTrip.endDate)}</span>
                    </div>
                    <div className="criteria-item">
                        <span className="criteria-label">Passengers:</span>
                        <span className="criteria-value">{activeTrip.travelers || 1}</span>
                    </div>
                </div>
            </div>

            {/* Flights Section */}
            {transportType === 'flights' && (
                <div className="results-section">
                    <div className="results-header">
                        <h3>{flights.length} Flights Found to {activeTrip.destination}</h3>
                        <p className="results-note">Showing available flights for your travel dates</p>
                    </div>

                    <div className="transport-grid">
                        {flights.map(flight => (
                            <div key={flight.id} className="transport-card">
                                <div className="transport-header">
                                    <div className="airline-info">
                                        <Plane size={24} className="transport-icon" />
                                        <div>
                                            <h4>{flight.airline}</h4>
                                            <span className="transport-type">{flight.stops}</span>
                                        </div>
                                    </div>
                                    <div className="price-info">
                                        <span className="price-label">Per person</span>
                                        <span className="price-amount">₹{flight.price.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                <div className="transport-route">
                                    <div className="route-point">
                                        <MapPin size={16} />
                                        <div>
                                            <div className="route-city">{flight.from}</div>
                                            <div className="route-time">{flight.departure}</div>
                                        </div>
                                    </div>
                                    <div className="route-duration">
                                        <Clock size={16} />
                                        <span>{flight.duration}</span>
                                    </div>
                                    <div className="route-point">
                                        <MapPin size={16} />
                                        <div>
                                            <div className="route-city">{flight.to}</div>
                                            <div className="route-time">{flight.arrival}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="transport-footer">
                                    <div className="total-price">
                                        Total: ₹{(flight.price * (activeTrip.travelers || 1)).toLocaleString('en-IN')}
                                        <span className="passenger-count"> ({activeTrip.travelers || 1} passenger{(activeTrip.travelers || 1) > 1 ? 's' : ''})</span>
                                    </div>
                                    <button className="btn btn-primary btn-sm">Book Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Trains Section */}
            {transportType === 'trains' && (
                <div className="results-section">
                    <div className="results-header">
                        <h3>{trains.length} Trains Found to {activeTrip.destination}</h3>
                        <p className="results-note">Showing available trains for your travel dates</p>
                    </div>

                    <div className="transport-grid">
                        {trains.map(train => (
                            <div key={train.id} className="transport-card">
                                <div className="transport-header">
                                    <div className="airline-info">
                                        <Train size={24} className="transport-icon" />
                                        <div>
                                            <h4>{train.name}</h4>
                                            <span className="transport-type">{train.class}</span>
                                        </div>
                                    </div>
                                    <div className="price-info">
                                        <span className="price-label">Per person</span>
                                        <span className="price-amount">₹{train.price.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                <div className="transport-route">
                                    <div className="route-point">
                                        <MapPin size={16} />
                                        <div>
                                            <div className="route-city">{train.from}</div>
                                            <div className="route-time">{train.departure}</div>
                                        </div>
                                    </div>
                                    <div className="route-duration">
                                        <Clock size={16} />
                                        <span>{train.duration}</span>
                                    </div>
                                    <div className="route-point">
                                        <MapPin size={16} />
                                        <div>
                                            <div className="route-city">{train.to}</div>
                                            <div className="route-time">{train.arrival}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="transport-footer">
                                    <div className="total-price">
                                        Total: ₹{(train.price * (activeTrip.travelers || 1)).toLocaleString('en-IN')}
                                        <span className="passenger-count"> ({activeTrip.travelers || 1} passenger{(activeTrip.travelers || 1) > 1 ? 's' : ''})</span>
                                    </div>
                                    <button className="btn btn-primary btn-sm">Book Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Buses Section */}
            {transportType === 'buses' && (
                <div className="results-section">
                    <div className="results-header">
                        <h3>{buses.length} Buses Found to {activeTrip.destination}</h3>
                        <p className="results-note">Showing available buses for your travel dates</p>
                    </div>

                    <div className="transport-grid">
                        {buses.map(bus => (
                            <div key={bus.id} className="transport-card">
                                <div className="transport-header">
                                    <div className="airline-info">
                                        <Bus size={24} className="transport-icon" />
                                        <div>
                                            <h4>{bus.operator}</h4>
                                            <span className="transport-type">{bus.type}</span>
                                        </div>
                                    </div>
                                    <div className="price-info">
                                        <span className="price-label">Per person</span>
                                        <span className="price-amount">₹{bus.price.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                <div className="transport-route">
                                    <div className="route-point">
                                        <MapPin size={16} />
                                        <div>
                                            <div className="route-city">{bus.from}</div>
                                            <div className="route-time">{bus.departure}</div>
                                        </div>
                                    </div>
                                    <div className="route-duration">
                                        <Clock size={16} />
                                        <span>{bus.duration}</span>
                                    </div>
                                    <div className="route-point">
                                        <MapPin size={16} />
                                        <div>
                                            <div className="route-city">{bus.to}</div>
                                            <div className="route-time">{bus.arrival}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="transport-footer">
                                    <div className="total-price">
                                        Total: ₹{(bus.price * (activeTrip.travelers || 1)).toLocaleString('en-IN')}
                                        <span className="passenger-count"> ({activeTrip.travelers || 1} passenger{(activeTrip.travelers || 1) > 1 ? 's' : ''})</span>
                                    </div>
                                    <button className="btn btn-primary btn-sm">Book Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transport;
