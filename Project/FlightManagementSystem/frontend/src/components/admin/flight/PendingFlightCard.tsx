import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './pendingFlightCard.css';

function PendingFlightCard({ flight, onApprove, onDecline, onFetch }) {
    const handleApprove = async () => {
        const bookingId = flight.bookingid; // Use bookingid from flight
        const userId = flight.user.id; // Access userId from the user object
        const flightId = flight.flight.id; // Access flightId from the flight object

        if (!bookingId || bookingId <= 0 || !userId || !flightId) {
            toast.error('Invalid booking details.');
            return;
        }

        try {
            await axios.put(`http://localhost:8080/bookings/updateStatus/${bookingId}`, {
                bookingid: bookingId,
                userId: userId,
                flightId: flightId,
                bookingDate: flight.bookingDate,
                totalAmount: flight.totalAmount,
                status: true // Change status to true
            });
            toast.success('Booking approved successfully');
            if (onApprove) onApprove(); // Refresh the list of pending bookings
            if (onFetch) onFetch(); // Reload data
        } catch (error) {
            console.error('Error approving booking:', error.response ? error.response.data : error.message);
            toast.error('An error occurred while approving the booking.');
        }
    };

    const handleDecline = async () => {
        const bookingId = flight.bookingid; // Use bookingid from flight

        if (!bookingId || bookingId <= 0) {
            toast.error('Invalid booking ID.');
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/bookings/delete/${bookingId}`);
            toast.success('Booking declined successfully');
            if (onDecline) onDecline(); // Refresh the list of pending bookings
            if (onFetch) onFetch(); // Reload data
        } catch (error) {
            console.error('Error declining booking:', error.response ? error.response.data : error.message);
            toast.error('An error occurred while declining the booking.');
        }
    };

    return (
        <div className="pending-flight-card">
            <h3>{flight.flight.airline || 'No Airline Available'}</h3>
            <p>Flight Number: {flight.flight.flightNumber || 'No Flight Number Available'}</p>
            <p>Departure Time: {flight.flight.departureTime || 'No Departure Time Available'}</p>
            <p>Arrival Time: {flight.flight.arrivalTime || 'No Arrival Time Available'}</p>
            <p>Origin: {flight.flight.origin || 'No Origin Available'}</p>
            <p>Destination: {flight.flight.destination || 'No Destination Available'}</p>
            <div className="pending-flight-card-actions">
                <button onClick={handleApprove}>Approve</button>
                <button onClick={handleDecline}>Decline</button>
            </div>
        </div>
    );
}

export default PendingFlightCard;
