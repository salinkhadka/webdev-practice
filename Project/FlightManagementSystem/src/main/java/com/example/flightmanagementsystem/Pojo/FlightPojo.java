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
public class FlightPojo {

    private Integer id;
    private String airline;
    private String flightNumber;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private String origin;
    private String destination;
    private Integer price;
}
