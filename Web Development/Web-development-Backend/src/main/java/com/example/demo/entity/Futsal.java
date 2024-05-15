package com.example.demo.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="grounds", uniqueConstraints = {
        @UniqueConstraint(name = "unique_ground_name",
                columnNames = {"ground_name"})
})
@Setter
@Getter
public class Futsal {


    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "information_seq_gen")
    @SequenceGenerator(name = "information_seq_gen",sequenceName = "information_seq",allocationSize = 1,initialValue = 1)
    @Id
    private Integer id;

    @Column(name="ground_name",length = 255)
    private String groundName;

     @Column(name="ground_image",length=255)
    private String image;


//     @OneToMany(mappedBy = "futsal",cascade = CascadeType.ALL,orphanRemoval = true)
//    private List<Book> books;
}

