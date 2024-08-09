import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './flightadd.css'

function FlightAdd() {
    const [flight, setFlight] = useState({
        id: '',
        airline: '',
        flightNumber: '',
        departureTime: '',
        destination: '',
        origin: '',
        arrivalTime: '',
        price: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFlight(prevFlight => ({
            ...prevFlight,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Format dates for backend
        const formattedFlight = {
            ...flight,
            departureTime: formatDate(flight.departureTime),
            arrivalTime: formatDate(flight.arrivalTime)
        };

        axios.post("http://localhost:8080/flights/flightcreate", formattedFlight)
            .then(res => {
                if (res.status === 201) {
                    toast.success('Flight added successfully');
                    // Reset form
                    setFlight({
                        id: '',
                        airline: '',
                        flightNumber: '',
                        departureTime: '',
                        destination: '',
                        origin: '',
                        arrivalTime: '',
                        price: ''
                    });
                } else {
                    toast.error('Failed to add flight');
                }
            })
            .catch(error => {
                console.error(error);
                toast.error('An error occurred: ' + error.message);
            });
    };

    const formatDate = (dateString: string) => {
        // Convert to format 'YYYY-MM-DDTHH:MM' for datetime-local input
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16); // Get 'YYYY-MM-DDTHH:MM' part
    };

    return (
        <div className="flightadd-container">
            <div className="flightadd-card">
                <h2>Add Flight</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="id">ID:</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={flight.id}
                            onChange={handleChange}
                            required
                            aria-label="ID"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="airline">Airline:</label>
                        <input
                            type="text"
                            id="airline"
                            name="airline"
                            value={flight.airline}
                            onChange={handleChange}
                            required
                            aria-label="Airline"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="flightNumber">Flight Number:</label>
                        <input
                            type="text"
                            id="flightNumber"
                            name="flightNumber"
                            value={flight.flightNumber}
                            onChange={handleChange}
                            required
                            aria-label="Flight Number"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="departureTime">Departure Time:</label>
                        <input
                            type="datetime-local"
                            id="departureTime"
                            name="departureTime"
                            value={flight.departureTime.slice(0, 16)}
                            onChange={handleChange}
                            required
                            aria-label="Departure Time"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="destination">Destination:</label>
                        <input
                            type="text"
                            id="destination"
                            name="destination"
                            value={flight.destination}
                            onChange={handleChange}
                            required
                            aria-label="Destination"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="origin">Origin:</label>
                        <input
                            type="text"
                            id="origin"
                            name="origin"
                            value={flight.origin}
                            onChange={handleChange}
                            required
                            aria-label="Origin"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="arrivalTime">Arrival Time:</label>
                        <input
                            type="datetime-local"
                            id="arrivalTime"
                            name="arrivalTime"
                            value={flight.arrivalTime.slice(0, 16)}
                            onChange={handleChange}
                            required
                            aria-label="Arrival Time"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number" 
                            id="price"
                            name="price"
                            value={flight.price}
                            onChange={handleChange}
                            required
                            aria-label="Price"
                        />
                    </div>
                    <button type="submit" className="flightadd-button">Add Flight</button>
                </form>
                <a onClick={() => { localStorage.clear(); window.location.href = "/home"; }}>Logout</a>
            </div>
        </div>
    );
};

export default FlightAdd;
