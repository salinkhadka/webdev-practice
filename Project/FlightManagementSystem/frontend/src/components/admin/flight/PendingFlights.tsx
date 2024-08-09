import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PendingFlightCard from './PendingFlightCard';
import './pendingFlightCard.css';

function PendingFlights() {
    const [pendingBookings, setPendingBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchPendingBookings = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/bookings/get');
            const pending = data.filter(booking => !booking.status);
            setPendingBookings(pending);
        } catch (error) {
            console.error('Error fetching pending bookings:', error);
            setError('Failed to fetch pending bookings');
            toast.error('An error occurred while fetching pending bookings.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingBookings();
    }, []);

    if (loading) return <p className="pending-loading-message">Loading...</p>;
    if (error) return <p className="pending-error-message">{error}</p>;

    return (
        <div className="pending-flights-container">
            <div className="pending-filter-container">
                <h2>Pending Bookings</h2>
                <div className="pending-filters">
                    <h3>Suggested For You</h3>
                    <label><input type="checkbox" /> Early Bird Deals</label>
                    <label><input type="checkbox" /> Free Cancellation</label>
                    <label><input type="checkbox" /> Breakfast Included</label>
                </div>
            </div>
            <div className="pending-flights-list">
                {pendingBookings.length === 0 ? (
                    <p className="pending-no-flights-message">No pending bookings available</p>
                ) : (
                    <div className="pending-flights-grid">
                        {pendingBookings.map((booking) => (
                            <PendingFlightCard
                                key={booking.bookingid} // Use a unique key here
                                flight={booking}
                                onApprove={() => fetchPendingBookings()} // Refresh data on approval
                                onDecline={() => fetchPendingBookings()} // Refresh data on decline
                                onFetch={fetchPendingBookings} // Pass fetch function for data reload
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PendingFlights;
