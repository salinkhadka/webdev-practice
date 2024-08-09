import React from 'react';
import './FlightCardUser.css';
import dummy from '../../../assets/d2.avif';

interface FlightCardProps {
    flight: {
        id: number;
        airline: string;
        flightNumber: string;
        departureTime: any;
        arrivalTime: any;
        destination: string;
        origin: string;
        price: number;
        imageUrl: string;
    };
    onBook: (flightId: number) => void;
}

const formatDate = (date: any) => {
    try {
        if (Array.isArray(date) && date.length === 5) {
            const [year, month, day, hour, minute] = date;
            const parsedDate = new Date(year, month - 1, day, hour, minute);
            return parsedDate.toLocaleString();
        }

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            console.warn('Invalid date format:', date);
            return 'Invalid Date';
        }
        return parsedDate.toLocaleString();
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
    }
};

const FlightCardUser: React.FC<FlightCardProps> = ({ flight, onBook }) => (
    <div className="flight-card">
        <div className="image-container">
            <img alt={`Flight ${flight.flightNumber}`} src={dummy} />
        </div>
        <div className="details-container">
            <h3>{flight.airline}</h3>
            <p>{flight.origin} to {flight.destination}</p>
            <p>Flight Number: {flight.flightNumber}</p>
            <p>Departure: {formatDate(flight.departureTime)}</p>
            <p>Arrival: {formatDate(flight.arrivalTime)}</p>
            <p>Price: ${flight.price}</p>
            <button className="book-button-custom" onClick={() => onBook(flight.id)}>Book</button>
        </div>
    </div>
);

export default FlightCardUser;
