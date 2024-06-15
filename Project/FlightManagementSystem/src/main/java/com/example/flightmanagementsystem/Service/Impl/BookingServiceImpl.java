package com.example.flightmanagementsystem.Service.Impl;

import com.example.flightmanagementsystem.Entity.Booking;
import com.example.flightmanagementsystem.Entity.Flight;
import com.example.flightmanagementsystem.Entity.User;
import com.example.flightmanagementsystem.Pojo.BookingPojo;
import com.example.flightmanagementsystem.Repository.BookingRepository;
import com.example.flightmanagementsystem.Repository.FlightRepository;
import com.example.flightmanagementsystem.Repository.UserRepository;
import com.example.flightmanagementsystem.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getBookingById(Integer id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    @Override
    public Booking createBooking(BookingPojo bookingPojo) {
        User user = userRepository.findById(bookingPojo.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Flight flight = flightRepository.findById(bookingPojo.getFlightId())
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setFlight(flight);
        booking.setBookingDate(bookingPojo.getBookingDate());
        booking.setTotalAmount(bookingPojo.getTotalAmount());
        booking.setStatus(bookingPojo.isStatus());

        return bookingRepository.save(booking);
    }

    @Override
    public void deleteBooking(Integer id) {
        bookingRepository.deleteById(id);
    }
}
