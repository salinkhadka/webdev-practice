package com.example.flightmanagementsystem.Entity;

import jakarta.persistence.*;
import lombok.*;


@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_table")
public class User {
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_gen")
    @SequenceGenerator(name = "user_seq_gen", sequenceName = "user_seq", allocationSize = 1)
    @Id
    private Integer id;

    @Column(name = "username")
    private String username;

    @Column(name = "useremail")
    private String user_email;

    @Column(name = "password")
    private String password;

    @Column(name = "contact_number")
    private String contact_number; // Changed to String for phone numbers

    @Column(name = "user_address")
    private String user_address;
}
