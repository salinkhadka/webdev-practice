package com.example.flightmanagementsystem.Service;

import com.example.flightmanagementsystem.Entity.Booking;
import com.example.flightmanagementsystem.Pojo.BookingPojo;
import org.springframework.stereotype.Service;

import java.util.List;

public interface BookingService {
    List<Booking> getBookingsByUserId(Integer userId);
    Booking updateBooking(Integer id, BookingPojo bookingPojo);
    List<Booking> getAllBookings();
    Booking getBookingById(Integer id);
    Booking createBooking(BookingPojo bookingPojo);
    void deleteBooking(Integer id);
}
