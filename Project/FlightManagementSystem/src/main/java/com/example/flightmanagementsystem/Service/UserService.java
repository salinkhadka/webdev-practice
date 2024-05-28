package com.example.flightmanagementsystem.Service;

import com.example.flightmanagementsystem.Entity.User;
import com.example.flightmanagementsystem.Pojo.UserPojo;

import java.util.List;

public interface UserService {
    void saveData(UserPojo userPojo);

    List<User> getAll();

    boolean login(String username, String password);

}
