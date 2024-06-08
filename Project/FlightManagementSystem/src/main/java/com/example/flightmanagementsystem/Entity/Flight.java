package com.example.flightmanagementsystem.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "flight")
public class Flight {
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "flight_seq_gen")
    @SequenceGenerator(name = "flight_seq_gen", sequenceName = "flight_seq", allocationSize = 1)
    @Id
    private Integer id;

    @Column(name = "airline")
    private String airline;

    @Column(name = "flight_number")
    private String flightNumber;

    @Column(name = "departure_time")
    private LocalDateTime departureTime;

    @Column(name = "arrival_time")
    private LocalDateTime arrivalTime;

    @Column(name = "origin")
    private String origin;

    @Column(name = "destination")
    private String destination;

    @Column(name = "price")
    private BigDecimal price;
}
