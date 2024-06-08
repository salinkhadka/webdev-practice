package com.example.flightmanagementsystem.Pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentPojo {

    private Integer id;
    private Integer bookingId; // Assuming you refer to Booking by ID
    private LocalDateTime paymentDate;
    private Integer paymentAmount;
    private String paymentMethod;
}
