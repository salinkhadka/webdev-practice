import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FlightCard from './flightcard';
import FlightModal from './Updateflight';
import './displayFlight.css';

function DisplayFlights() {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleUpdate = (flight) => {
        setSelectedFlight(flight);
        setIsModalOpen(true);
    };

    const handleFlightUpdated = () => {
        fetchFlights();
    };

    const handleRemove = async (flightId) => {
        try {
            await axios.delete(`http://localhost:8080/flights/remove/${flightId}`);
            toast.success('Flight removed successfully');
            fetchFlights();
        } catch (error) {
            toast.error('Error removing flight');
            console.error('Error removing flight:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flights-container">
            <div className="filter-container">
                <h2>Flight List</h2>
                <div className="filters">
                    <h3>Suggested For You</h3>
                    <label><input type="checkbox" /> Early Bird Deals</label>
                    <label><input type="checkbox" /> Free Cancellation</label>
                    <label><input type="checkbox" /> Breakfast Included</label>
                </div>
            </div>
            <div className="flights-list">
                {flights.length === 0 ? (
                    <p>No flights available</p>
                ) : (
                    <div className="flights-grid">
                        {flights.map((flight) => (
                            <FlightCard key={flight.id} flight={flight} onUpdate={handleUpdate} onRemove={handleRemove} />
                        ))}
                    </div>
                )}
            </div>
            {isModalOpen && (
                <FlightModal
                    show={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    flight={selectedFlight}
                    onFlightUpdated={handleFlightUpdated}
                />
            )}
        </div>
    );
}

export default DisplayFlights;
