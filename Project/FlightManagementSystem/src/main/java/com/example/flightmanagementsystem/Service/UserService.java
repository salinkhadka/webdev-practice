package com.example.flightmanagementsystem.Service;

import com.example.flightmanagementsystem.Entity.User;
import com.example.flightmanagementsystem.Pojo.UserPojo;
import java.util.List;

public interface UserService {
    void saveData(UserPojo userPojo);
    List<User> getAll();
    Integer login(String username, String password);
    User updateUser(Integer id, UserPojo userPojo);
    void deleteUser(Integer id);
    User getUserById(Integer id);
    // User getUserByEmail(String email);
}
