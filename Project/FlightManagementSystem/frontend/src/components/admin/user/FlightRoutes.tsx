import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './FlightRoute.css';

interface Flight {
    id: number;
    airline: string;
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
    origin: string;
    destination: string;
    price: number;
}

const FlightRoutes: React.FC = () => {
    const [searchParams, setSearchParams] = useState({
        origin: '',
        destination: ''
    });

    const [flights, setFlights] = useState<Flight[]>([]);
    const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchFlights();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchParams(prevParams => ({ ...prevParams, [name]: value }));
    };

    const fetchFlights = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/flights/getAll');
            setFlights(data);
            filterFlights(data);
        } catch (error) {
            console.error('Error fetching flights:', error);
            setError('Failed to fetch flights');
            toast.error('An error occurred while fetching flights.');
        } finally {
            setLoading(false);
        }
    };

    const filterFlights = (allFlights: Flight[]) => {
        const { origin, destination } = searchParams;
        const filtered = allFlights.filter(flight => 
            (origin ? flight.origin.toLowerCase() === origin.toLowerCase() : true) &&
            (destination ? flight.destination.toLowerCase() === destination.toLowerCase() : true)
        );
        setFilteredFlights(filtered);
    };

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
        <>
            <div className="flight-routes">
                <h3>Search Flights</h3>
                <div className="form-group">
                    <label>Origin</label>
                    <input type="text" name="origin" value={searchParams.origin} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Destination</label>
                    <input type="text" name="destination" value={searchParams.destination} onChange={handleChange} />
                </div>
                <button onClick={fetchFlights}>Search</button>
            </div>
            <div className="results-container">
                <div className="results">
                    {filteredFlights.length === 0 ? (
                        <p>No flights found</p>
                    ) : (
                        filteredFlights.map((flight) => (
                            <div key={flight.id} className="flight-card">
                                <p><strong>Airline:</strong> {flight.airline}</p>
                                <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
                                <p><strong>Departure Time:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
                                <p><strong>Arrival Time:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
                                <p><strong>Origin:</strong> {flight.origin}</p>
                                <p><strong>Destination:</strong> {flight.destination}</p>
                                <p><strong>Price:</strong> ${flight.price}</p>
                                <button onClick={() => handleBook(flight.id)}>Book</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default FlightRoutes;
