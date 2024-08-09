import React from 'react';
import './flightcard.css';
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
    onUpdate: (flight: any) => void;
    onRemove: (flightId: number) => void;
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

const FlightCard: React.FC<FlightCardProps> = ({ flight, onUpdate, onRemove }) => (
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
            <button className="update-button" onClick={() => onUpdate(flight)}>Update</button>
            <button className="remove-button" onClick={() => onRemove(flight.id)}>Remove</button>
        </div>
    </div>
);

export default FlightCard;
