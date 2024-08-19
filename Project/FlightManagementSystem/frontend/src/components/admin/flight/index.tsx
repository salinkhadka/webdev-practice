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

    // Filter states
    const [airline, setAirline] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(6000); // Default max price updated
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [airlines, setAirlines] = useState([]);

    const fetchFlights = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/flights/getAll');
            setFlights(data);
            setFilteredFlights(data);
            // Extract unique airlines from flight data
            const uniqueAirlines = [...new Set(data.map(flight => flight.airline))];
            setAirlines(uniqueAirlines);
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

    useEffect(() => {
        filterFlights();
    }, [airline, minPrice, maxPrice, flights]);

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

    const filterFlights = () => {
        const filtered = flights.filter(flight =>
            (airline === '' || flight.airline === airline) &&
            flight.price >= minPrice &&
            flight.price <= maxPrice
        );
        setFilteredFlights(filtered);
    };

    const handleAirlineChange = (e) => {
        setAirline(e.target.value);
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        if (name === 'minPrice') setMinPrice(Number(value));
        if (name === 'maxPrice') setMaxPrice(Number(value));
    };

    const handleFilterSubmit = () => {
        filterFlights();
    };

    const handleClearFilters = () => {
        setAirline('');
        setMinPrice(0);
        setMaxPrice(6000); // Default max price updated
        filterFlights();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flights-container">
            <div className="filter-container">
                <h2>Flight List</h2>
                <div className="filters">
                    <h3>Filter by Airline</h3>
                    <select value={airline} onChange={handleAirlineChange}>
                        <option value="">Select Airline</option>
                        {airlines.map((airline) => (
                            <option key={airline} value={airline}>
                                {airline}
                            </option>
                        ))}
                    </select>
                    <h3>Filter by Price</h3>
                    <div className="price-slider-container">
                        <div className="price-slider-label">
                            <span>${minPrice}</span>
                            <span>${maxPrice}</span>
                        </div>
                        <input
                            type="range"
                            name="minPrice"
                            min="0"
                            max="6000" // Updated max value
                            value={minPrice}
                            onChange={handlePriceChange}
                            className="price-slider"
                        />
                        <input
                            type="range"
                            name="maxPrice"
                            min="0"
                            max="6000" // Updated max value
                            value={maxPrice}
                            onChange={handlePriceChange}
                            className="price-slider"
                        />
                        <div className="price-slider-inputs">
                            <input
                                type="number"
                                name="minPrice"
                                value={minPrice}
                                onChange={handlePriceChange}
                            />
                            <input
                                type="number"
                                name="maxPrice"
                                value={maxPrice}
                                onChange={handlePriceChange}
                            />
                        </div>
                    </div>
                    <button onClick={handleFilterSubmit}>Apply Filters</button>
                    <button className="clear-filters" onClick={handleClearFilters}>Clear Filters</button>
                </div>
            </div>
            <div className="flights-list">
                {filteredFlights.length === 0 ? (
                    <p>No flights available</p>
                ) : (
                    <div className="flights-grid">
                        {filteredFlights.map((flight) => (
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
