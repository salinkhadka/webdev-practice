package com.example.flightmanagementsystem.Service.Impl;

import com.example.flightmanagementsystem.Entity.Booking;
import com.example.flightmanagementsystem.Entity.Payment;
import com.example.flightmanagementsystem.Pojo.PaymentPojo;
import com.example.flightmanagementsystem.Repository.BookingRepository;
import com.example.flightmanagementsystem.Repository.PaymentRepository;
import com.example.flightmanagementsystem.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment getPaymentById(Integer id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    @Override
    public Payment createPayment(PaymentPojo paymentPojo) {
        Booking booking = bookingRepository.findById(paymentPojo.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setPaymentDate(paymentPojo.getPaymentDate());
        payment.setPaymentAmount(paymentPojo.getPaymentAmount());
        payment.setPaymentMethod(paymentPojo.getPaymentMethod());

        return paymentRepository.save(payment);
    }

    @Override
    public void deletePayment(Integer id) {
        paymentRepository.deleteById(id);
    }
}
