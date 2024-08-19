package com.example.flightmanagementsystem.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Entity
@Table(name = "booking")
public class Booking {
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "booking_seq_gen")
    @SequenceGenerator(name = "booking_seq_gen", sequenceName = "booking_seq", allocationSize = 1)
    @Id
    private Integer bookingid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "foreign_key_user_id"))
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flight_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "foreign_key_flight_id"))
    private Flight flight;

    @Column(name = "booking_date")
    private LocalDate bookingDate;

    @Column(name = "total_amount")
    private int totalAmount;

    @Column(name = "status", nullable = true)
    private Integer status;
}
