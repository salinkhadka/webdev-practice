package com.example.flightmanagementsystem.Controller;

import com.example.flightmanagementsystem.Entity.Booking;
import com.example.flightmanagementsystem.Pojo.BookingPojo;
import com.example.flightmanagementsystem.Pojo.GlobalApiResponse;
import com.example.flightmanagementsystem.Pojo.UserPojo;
import com.example.flightmanagementsystem.Service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final BookingService bookingService;

    @GetMapping("get")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("getid/{id}")
    public Booking getBookingById(@PathVariable Integer id) {
        return bookingService.getBookingById(id);
    }

    @PostMapping("/create")
    public GlobalApiResponse<String> createBooking(@RequestBody BookingPojo bookingPojo) {
        GlobalApiResponse<String> globalApiResponse = new GlobalApiResponse<String>();
        globalApiResponse.setMessage("Booking created successfully");
        globalApiResponse.setStatus(200);
        globalApiResponse.setData("data");
        bookingService.createBooking(bookingPojo);
        return globalApiResponse;

    }
    @PutMapping("/updateStatus/{id}")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Integer id,@RequestBody BookingPojo bookingPojo) {
        Booking booking = bookingService.getBookingById(id);
        booking.setStatus(true); // Update status to true
        Booking updatedBooking = bookingService.updateBooking(id, bookingPojo);
        return ResponseEntity.ok(updatedBooking);
    }
    @DeleteMapping("delete/{id}") 
    public void deleteBooking(@PathVariable Integer id) {
        bookingService.deleteBooking(id);
    }
    @GetMapping("getbyuser/{userId}")
    public List<Booking> getBookingsByUserId(@PathVariable Integer userId) {
        return bookingService.getBookingsByUserId(userId);
    }
}
