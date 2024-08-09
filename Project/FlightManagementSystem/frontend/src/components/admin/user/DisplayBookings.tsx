import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import BookingCard from './BookingCard';
import './DisplayBookings.css';

function DisplayBookings() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchBookings = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found in local storage');
            }
            const { data } = await axios.get(`http://localhost:8080/bookings/getbyuser/${userId}`);
            console.log('Fetched data:', data); // Log the data
    
            if (Array.isArray(data)) {
                setBookings(data);
            } else { 
                console.error('Unexpected data format:', data);
                throw new Error('Unexpected data format');
            }
        } catch (error: any) {
            console.error('Error fetching bookings:', error);
            setError(`Failed to fetch bookings: ${error.message}`);
            toast.error(`An error occurred while fetching bookings: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => { 
        fetchBookings();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!Array.isArray(bookings)) return <p>Unexpected data format</p>;

    return (
        <div className="bookings-container-custom">
            <div className="filter-container-custom">
                <h2>Booking List</h2>
                <div className="filters-custom">
                    <h3>Suggested For You</h3>
                    <label><input type="checkbox" /> Approved</label>
                    <label><input type="checkbox" /> Declined</label>
                    <label><input type="checkbox" /> Pending</label>
                </div>
            </div>
            <div className="bookings-list-custom">
                {bookings.length === 0 ? (
                    <p>No bookings available</p>
                ) : (
                    <div className="bookings-grid-custom">
                        {bookings.map((booking) => (
                            <BookingCard key={booking.bookingid} booking={booking} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DisplayBookings;
