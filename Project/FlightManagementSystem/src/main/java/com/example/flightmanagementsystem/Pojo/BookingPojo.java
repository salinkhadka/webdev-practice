package com.example.flightmanagementsystem.Pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BookingPojo {

    private Integer bookingid;
    private Integer userId; // Assuming you refer to User by ID
    private Integer flightId; // Assuming you refer to Flight by ID
    private LocalDate bookingDate;
    private Integer totalAmount;
    private boolean status;
}
