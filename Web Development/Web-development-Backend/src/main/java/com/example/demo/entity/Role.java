package com.example.demo.entity;


import jakarta.persistence.*;

@Entity
@Table(name="roles")
public class Role {
    @GeneratedValue(generator = "roles_seq_gen",strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "roles_seq_gen",sequenceName = "roles_seq",allocationSize = 1,initialValue = 1)
    @Id
    private Integer id;

    @Column(name="name",nullable=false)
    private String name;
}
