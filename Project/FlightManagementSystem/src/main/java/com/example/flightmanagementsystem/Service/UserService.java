package com.example.flightmanagementsystem.Service;

import com.example.flightmanagementsystem.Entity.User;
import com.example.flightmanagementsystem.Pojo.UserPojo;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface  UserService {
    void saveData(UserPojo userPojo);

    List<User> getAll();

    boolean login(String username, String password);

}
