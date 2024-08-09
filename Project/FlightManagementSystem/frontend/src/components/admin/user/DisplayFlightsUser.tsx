import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FlightCardUser from './FlightCardUser';
import './DisplayFlightsUser.css';

function DisplayFlights() {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchFlights = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/flights/getAll');
            setFlights(data);
        } catch (error) {
            console.error('Error fetching flights:', error);
            setError('Failed to fetch flights');
            toast.error('An error occurred while fetching flights.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlights();
    }, []);

    const handleBook = async (flightId: number) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            toast.error('User not found in local storage.');
            return;
        }

        const flight = flights.find(f => f.id === flightId);
        if (!flight) {
            toast.error('Flight not found.');
            return;
        }

        const bookingData = {
            userId,
            flightId,
            bookingDate: new Date().toISOString(),
            totalAmount: flight.price,
            status: false
        };

        try {
            await axios.post('http://localhost:8080/bookings/create', bookingData);
            toast.success(`Flight ${flightId} booked successfully!`);
        } catch (error) {
            toast.error('Error booking flight');
            console.error('Error booking flight:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flights-container-custom">
            <div className="filter-container-custom">
                <h2>Flight List</h2>
                <div className="filters-custom">
                    <h3>Suggested For You</h3>
                    <label><input type="checkbox" /> Early Bird Deals</label>
                    <label><input type="checkbox" /> Free Cancellation</label>
                    <label><input type="checkbox" /> Breakfast Included</label>
                </div>
            </div>
            <div className="flights-list-custom">
                {flights.length === 0 ? (
                    <p>No flights available</p>
                ) : (
                    <div className="flights-grid-custom">
                        {flights.map((flight) => (
                            <FlightCardUser key={flight.id} flight={flight} onBook={handleBook} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DisplayFlights;
