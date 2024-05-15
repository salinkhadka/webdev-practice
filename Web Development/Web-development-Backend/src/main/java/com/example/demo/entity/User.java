package com.example.demo.entity;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="users", uniqueConstraints = {
        @UniqueConstraint(name = "unique_user_name",
                columnNames = {"user_name"})
})
public class User {


    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "information_seq_gen")
    @SequenceGenerator(name = "information_seq_gen",sequenceName = "information_seq",allocationSize = 1,initialValue = 1)
    @Id
    private Integer id;

    @Column(name="user_name",length = 255)
    private String userName;

    @Column(name="address",length=255)
    private String address;

    @Column(name="contact",length = 255)
    private  Integer contactNumber;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "users_roles",
            foreignKey = @ForeignKey(name = "FK_users_roles_userId"),
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseForeignKey = @ForeignKey(name = "FK_users_roles_roleId"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private List<Role> roles;
}

//
//uniqueConstraints = @UniqueConstraint(name = "UNIQUE_users_roles_userIdRoleId",
//        columnNames = {"user_id", "role_id"}