import React from 'react';
import './BookingCard.css'; // Add your CSS file

interface BookingCardProps {
    booking: {
        bookingid: number;
        user: {
            username: string;
        };
        flight: {
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
        status: boolean;
    };
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
    const statusText = booking.status === true ? 'Approved' : 'Pending';
    const statusClass = booking.status === true ? 'approved' : 'pending';

    return (
        <div className={`booking-card ${statusClass}`}>
            <h4 className={`status-heading ${statusClass}`}>{statusText}</h4>
            <div className="booking-info">
                <h3>Booking ID: {booking.bookingid}</h3>
                <p><strong>Username:</strong> {booking.user.username}</p>
                <p><strong>Flight:</strong> {booking.flight.airline} {booking.flight.flightNumber}</p>
                <p><strong>Departure:</strong> {booking.flight.departureTime}</p>
                <p><strong>Arrival:</strong> {booking.flight.arrivalTime}</p>
                <p><strong>Origin:</strong> {booking.flight.origin}</p>
                <p><strong>Destination:</strong> {booking.flight.destination}</p>
                <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>
                <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
                {booking.status === true && (
                    <div className="status-text approved-text">
                        <p>For further inquiries, please contact our customer support.</p>
                    </div>
                )}
                {booking.status === false && (
                    <div className="status-text pending-text">
                        <p>Note: If it is removed from your booking page, please consider it declined and try booking other flights.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingCard;
