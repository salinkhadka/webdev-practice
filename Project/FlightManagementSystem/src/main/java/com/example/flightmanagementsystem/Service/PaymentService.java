package com.example.flightmanagementsystem.Service;

import com.example.flightmanagementsystem.Entity.Payment;
import com.example.flightmanagementsystem.Pojo.PaymentPojo;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PaymentService {
    List<Payment> getAllPayments();

    Payment getPaymentById(Integer id);

    Payment createPayment(PaymentPojo paymentPojo);

    void deletePayment(Integer id);
}
