import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import BookingCard from './BookingCard';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Import html2canvas for capturing HTML content
import './DisplayBookings.css';
import 'react-toastify/dist/ReactToastify.css';

function DisplayBookings() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchBookings = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('Login first to view your ticket status');
            }
            const { data } = await axios.get(`http://localhost:8080/bookings/getbyuser/${userId}`);
            console.log('Fetched data:', data);
    
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

    const handleCancelBooking = async (bookingId: number) => {
        try {
            await axios.delete(`http://localhost:8080/bookings/delete/${bookingId}`);
            toast.success(`Booking ${bookingId} cancelled successfully!`);
            fetchBookings();
        } catch (error) {
            console.error('Error cancelling booking:', error);
            toast.error('Failed to cancel the booking.');
        }
    };

    const generatePDF = async () => {
        const doc = new jsPDF();
        const element = document.querySelector('.bookings-list-custom');

        if (element) {
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const pdf = new jsPDF('p', 'mm', 'a4');

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('approved-tickets.pdf');
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
                
            </div>
            <div className="bookings-list-custom">
                {bookings.length === 0 ? (
                    <p>No bookings available</p>
                ) : (
                    <div className="bookings-grid-custom">
                        {bookings.map((booking) => (
                            <BookingCard 
                                key={booking.bookingid} 
                                booking={booking}
                                onCancel={() => handleCancelBooking(booking.bookingid)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <ToastContainer />
        </div>
    );
}

export default DisplayBookings;
