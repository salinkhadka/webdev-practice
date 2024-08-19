import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './pendingFlightCard.css'; // Add your CSS file

interface PendingFlightCardProps {
    flight?: {
        bookingid: number;
        user: {
            id: number; // Ensure user ID is present
            username: string;
        };
        flight: {
            id: number; // Ensure flight ID is present
            airline: string;
            flightNumber: string;
            departureTime: string;
            arrivalTime: string;
            origin: string;
            destination: string;
            price: number;
        };
        bookingDate: string;
        totalAmount: number;
        status: number; // Status should be a number
    };
    onApprove: () => void;
    onDecline: () => void;
}

const PendingFlightCard: React.FC<PendingFlightCardProps> = ({ flight, onApprove, onDecline }) => {
    if (!flight) {
        return <div>Error: Flight data is not available</div>;
    }

    // Add logging to check the flight data structure
    console.log('Flight data:', flight);

    const handleApprove = async () => {
        const payload = {
            bookingid: flight.bookingid,
            userId: flight.user.id, // Ensure userId is being retrieved correctly
            flightId: flight.flight.id, // Ensure flightId is being retrieved correctly
            bookingDate: flight.bookingDate,
            totalAmount: flight.totalAmount,
            status: 2, // Approved status
        };
    
        try {
            const response = await axios.put(`http://localhost:8080/bookings/updateStatus/${flight.bookingid}`, payload);
    
            if (response.status === 200 || response.status === 201) { 
                // Check for successful response status codes
                toast.success(`Booking ${flight.bookingid} approved successfully!`);
                onApprove(); // Refresh data
            } else {
                toast.error(`Unexpected response code: ${response.status}`);
            }
        } catch (error) {
            console.error('Error approving booking:', error);
            if (error.response && error.response.data) {
                // Show specific error message from the server if available
                toast.error(`Failed to approve the booking: ${error.response.data.message}`);
            } else {
                toast.error('Failed to approve the booking.');
            }
        }
    };
    
    const handleDecline = async () => {
        const payload = {
            bookingid: flight.bookingid,
            userId: flight.user.id, // Ensure userId is being retrieved correctly
            flightId: flight.flight.id, // Ensure flightId is being retrieved correctly
            bookingDate: flight.bookingDate,
            totalAmount: flight.totalAmount,
            status: 3, // Declined status
        };
    
        try {
            const response = await axios.put(`http://localhost:8080/bookings/updateStatus/${flight.bookingid}`, payload);
    
            if (response.status === 200 || response.status === 201) { 
                // Check for successful response status codes
                toast.success(`Booking ${flight.bookingid} declined successfully!`);
                onDecline(); // Refresh data
            } else {
                toast.error(`Unexpected response code: ${response.status}`);
            }
        } catch (error) {
            console.error('Error declining booking:', error);
            if (error.response && error.response.data) {
                // Show specific error message from the server if available
                toast.error(`Failed to decline the booking: ${error.response.data.message}`);
            } else {
                toast.error('Failed to decline the booking.');
            }
        }
    };
    

    return (
        <div className="pending-flight-card">
            <h4>Booking ID: {flight.bookingid}</h4>
            <p><strong>Username:</strong> {flight.user.username}</p>
            <p><strong>Flight:</strong> {flight.flight.airline} {flight.flight.flightNumber}</p>
            <p><strong>Departure:</strong> {flight.flight.departureTime}</p>
            <p><strong>Arrival:</strong> {flight.flight.arrivalTime}</p>
            <p><strong>Origin:</strong> {flight.flight.origin}</p>
            <p><strong>Destination:</strong> {flight.flight.destination}</p>
            <p><strong>Total Amount:</strong> ${flight.totalAmount}</p>
            <p><strong>Booking Date:</strong> {flight.bookingDate}</p>
            <div className="pending-flight-actions">
                <button onClick={handleApprove}>Approve</button>
                <button onClick={handleDecline}>Decline</button>
            </div>
        </div>
    );
};

export default PendingFlightCard;
