package com.example.flightmanagementsystem.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "payment")
public class Payment {
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "payment_seq_gen")
    @SequenceGenerator(name = "payment_seq_gen", sequenceName = "payment_seq", allocationSize = 1)
    @Id
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", referencedColumnName = "bookingid", foreignKey = @ForeignKey(name = "foreign_key_booking_id"))
    private Booking booking;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "payment_amount")
    private int paymentAmount;

    @Column(name = "payment_method")
    private String paymentMethod;
}
