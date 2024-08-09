import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './flightmodal.css';

const FlightModal = ({ show, onClose, flight, onFlightUpdated }) => {
    const [formData, setFormData] = useState({
        airline: flight.airline,
        flightNumber: flight.flightNumber,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        destination: flight.destination,
        origin: flight.origin,
        price: flight.price,
        imageUrl: flight.imageUrl,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/flights/update/${flight.id}`, formData);
            toast.success('Flight updated successfully');
            onFlightUpdated();
            onClose();
        } catch (error) {
            toast.error('Error updating flight');
            console.error('Error updating flight:', error);
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Update Flight</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Airline:
                        <input type="text" name="airline" value={formData.airline} onChange={handleChange} />
                    </label>
                    <label>
                        Flight Number:
                        <input type="text" name="flightNumber" value={formData.flightNumber} onChange={handleChange} />
                    </label>
                    <label>
                        Departure Time:
                        <input type="datetime-local" name="departureTime" value={formData.departureTime} onChange={handleChange} />
                    </label>
                    <label>
                        Arrival Time:
                        <input type="datetime-local" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} />
                    </label>
                    <label>
                        Destination:
                        <input type="text" name="destination" value={formData.destination} onChange={handleChange} />
                    </label>
                    <label>
                        Origin:
                        <input type="text" name="origin" value={formData.origin} onChange={handleChange} />
                    </label>
                    <label>
                        Price:
                        <input type="number" name="price" value={formData.price} onChange={handleChange} />
                    </label>
                    <label>
                        Image URL:
                        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                    </label>
                    <button type="submit">Update Flight</button>
                </form>
            </div>
        </div>
    );
};

export default FlightModal;
