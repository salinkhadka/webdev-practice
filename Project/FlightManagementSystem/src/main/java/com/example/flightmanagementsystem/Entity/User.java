package com.example.flightmanagementsystem.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="user_table")
public class User {
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "parameter_setup_seq_gen")
    @SequenceGenerator(name = "parameter_setup_seq_gen", sequenceName = "parameters_setup_seq", allocationSize = 1)
    @Id
    private Integer id;

    @Column(name="username")
    private String username;

    @Column(name = "useremail")
    private String user_email;

    @Column(name="password")
    private String password;

    @Column(name="contact_number")
    private Integer contact_number;

    @Column(name="user_address")
    private String user_address;
}
