import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import FlightCardUser from './FlightCardUser';
import './DisplayFlightsUser.css';; // Import toast styles

function DisplayFlights() {
    const [flights, setFlights] = useState<any[]>([]);
    const [filteredFlights, setFilteredFlights] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [priceRange, setPriceRange] = useState<[number, number]>([300, 5000]);
    const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([300, 5000]);
    const [selectedAirline, setSelectedAirline] = useState<string>('');

    // Fetch flight data from the backend
    const fetchFlights = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/flights/getAll');
            setFlights(data);
            setFilteredFlights(data); // Initialize filteredFlights with all flights
            // toast.success('Flights loaded successfully!'); // Success toast
        } catch (error) {n
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

    // Filter flights based on the selected price range and airline
    useEffect(() => {
        const filtered = flights.filter(flight => 
            flight.price >= priceRange[0] &&
            flight.price <= priceRange[1] &&
            (selectedAirline ? flight.airline === selectedAirline : true)
        );
        setFilteredFlights(filtered);
    }, [priceRange, flights, selectedAirline]);

    const handleBook = async (flightId: number) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            toast.error('Login First to book flight.');
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
            status: 1 // 1 indicates 'pending'
        };

        try {
            await axios.post('http://localhost:8080/bookings/create', bookingData);
            toast.success(`Flight ${flightId} booked successfully!`);
        } catch (error) {
            toast.error('Error booking flight');
            console.error('Error booking flight:', error);
        }
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTempPriceRange([Number(value[0]), Number(value[1])]);
    };

    const applyFilter = () => {
        // Ensure that the minimum price is less than or equal to the maximum price
        if (tempPriceRange[0] <= tempPriceRange[1]) {
            setPriceRange(tempPriceRange);
            toast.success('Filters applied successfully!'); // Success toast
        } else {
            toast.error('Minimum price cannot be greater than maximum price.');
        }
    };

    const handleClearFilters = () => {
        setPriceRange([300, 5000]);
        setTempPriceRange([300, 5000]);
        setSelectedAirline('');
        toast.info('Filters cleared. Showing all flights.'); // Info toast
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flights-container-custom">
            <div className="filter-container-custom">
                <h2>Flight List</h2>
                <div className="filters-custom">
                    <h3>Airline</h3>
                    <select 
                        value={selectedAirline} 
                        onChange={e => setSelectedAirline(e.target.value)}
                    >
                        <option value="">All Airlines</option>
                        {Array.from(new Set(flights.map(flight => flight.airline))).map(airline => (
                            <option key={airline} value={airline}>{airline}</option>
                        ))}
                    </select>
                    <h3>Price Range</h3>
                    <div className="price-slider-container">
                        <input 
                            type="range" 
                            min="0" 
                            max="5000" 
                            value={tempPriceRange[0]} 
                            onChange={e => setTempPriceRange([Number(e.target.value), tempPriceRange[1]])}
                            className="price-slider"
                        />
                        <input 
                            type="range" 
                            min="0" 
                            max="5000" 
                            value={tempPriceRange[1]} 
                            onChange={e => setTempPriceRange([tempPriceRange[0], Number(e.target.value)])}
                            className="price-slider"
                        />
                        <div className="price-values">
                            <span>Min Price: {tempPriceRange[0]}</span>
                            <span>Max Price: {tempPriceRange[1]}</span>
                        </div>
                    </div>
                    <div className="button-container">
                        <button onClick={applyFilter}>Filter</button>
                        <button className="clear-filters" onClick={handleClearFilters}>Clear Filters</button>
                    </div>
                </div>
            </div>
            <div className="flights-list-custom">
                {filteredFlights.length === 0 ? (
                    <p>No flights available</p>
                ) : (
                    <div className="flights-grid-custom">
                        {filteredFlights.map((flight) => (
                            <FlightCardUser key={flight.id} flight={flight} onBook={handleBook} />
                        ))}
                    </div>
                )}
            </div>

            {/* Add ToastContainer here */}
            <ToastContainer />
        </div>
    );
}

export default DisplayFlights;
