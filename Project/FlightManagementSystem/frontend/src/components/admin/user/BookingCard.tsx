import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './BookingCard.css'; // Add your CSS file

interface BookingCardProps {
    booking: {
        bookingid: number;
        user: {
            username: string;
        };
        flight: {
            airline: string;
            flightNumber: string;
            departureTime: string;
            arrivalTime: string;
            origin: string;
            destination: string;
            price: number;
        };
        bookingDate: string;
        totalAmount: number;
        status: number; // Update status type to number
    };
    onCancel: () => void; // Add the onCancel prop
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onCancel }) => {
    const statusText =
        booking.status === 2 ? 'Approved' :
        booking.status === 1 ? 'Pending' :
        booking.status === 3 ? 'Declined' :
        'Unknown Status'; // Handle unknown statuses

    const statusClass =
        booking.status === 2 ? 'approved' :
        booking.status === 1 ? 'pending' :
        booking.status === 3 ? 'declined' :
        ''; // Handle unknown statuses

   const generatePDF = async () => {
    const element = document.getElementById(`booking-card-${booking.bookingid}`);

    if (element) {
        // Temporarily hide the PDF generation button
        const button = element.querySelector('.btn-generate-pdf');
        if (button) {
            button.style.display = 'none';
        }

        // Capture the HTML content as an image
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        // Add additional messages to the PDF
        const margin = 10; // Margin from the edge of the page
        const yOffset = imgHeight + margin; // Position below the image
        pdf.setFontSize(12);
        pdf.text('This is your ticket. Please do not share it with anyone else.', margin, yOffset);
        pdf.text('For any issues, please contact our customer support.', margin, yOffset + 10);
        pdf.text('Thank you for choosing our airline!', margin, yOffset + 20);

        // Save the PDF
        pdf.save(`booking-${booking.bookingid}.pdf`);

        // Restore the button's visibility
        if (button) {
            button.style.display = 'inline-block';
        }
    }
};


    return (
        <div id={`booking-card-${booking.bookingid}`} className={`booking-card ${statusClass}`}>
            <h4 className={`status-heading ${statusClass}`}>{statusText}</h4>
            <div className="booking-info">
                <h3>Booking ID: {booking.bookingid}</h3>
                <p><strong>Username:</strong> {booking.user.username}</p>
                <p><strong>Flight:</strong> {booking.flight.airline} {booking.flight.flightNumber}</p>
                <p><strong>Departure:</strong> {booking.flight.departureTime}</p>
                <p><strong>Arrival:</strong> {booking.flight.arrivalTime}</p>
                <p><strong>Origin:</strong> {booking.flight.origin}</p>
                <p><strong>Destination:</strong> {booking.flight.destination}</p>
                <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>
                <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
                {booking.status === 2 && (
                    <div className="status-text approved-text">
                        <p>For further inquiries, please contact our customer support.</p>
                    </div>
                )}
                {booking.status === 1 && (
                    <div className="status-text pending-text">
                        <p>Note: If it is removed from your booking page, please consider it declined and try booking other flights.</p>
                    </div>
                )}
                {booking.status === 3 && (
                    <div className="status-text declined-text">
                        <p>Your booking has been declined. Please contact support for further details.</p>
                    </div>
                )}
                {/* Add the cancel button here */}
                {booking.status === 1 && (
                    <button className="cancel-button" onClick={onCancel}>
                        Cancel Booking
                    </button>
                )}
                {/* Add the generate PDF button here */}
                {booking.status === 2 && (
                    <button className="btn-generate-pdf" onClick={generatePDF}>
                        Generate PDF
                    </button>
                )}
            </div>
        </div>
    );
};

export default BookingCard;
