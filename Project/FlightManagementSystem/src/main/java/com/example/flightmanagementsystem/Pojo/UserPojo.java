package com.example.flightmanagementsystem.Pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class UserPojo {

    private Integer id;


    private String user_name;

    private String user_email;

    private String password;

    private Integer contact_number;

    private String user_address;
}
