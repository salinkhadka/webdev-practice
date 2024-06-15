package com.example.flightmanagementsystem.Service.Impl;

import com.example.flightmanagementsystem.Entity.User;
import com.example.flightmanagementsystem.Pojo.UserPojo;
import com.example.flightmanagementsystem.Repository.UserRepository;
import com.example.flightmanagementsystem.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public void saveData(UserPojo userPojo) {
        User user=new User();
        user.setId(userPojo.getId());
        user.setUsername(userPojo.getUser_name());
        user.setUser_email(userPojo.getUser_email());
        user.setPassword(userPojo.getPassword());
        user.setContact_number(userPojo.getContact_number());
        user.setUser_address(userPojo.getUser_address());
        userRepository.save(user);



    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }


    @Override
    public boolean login(String username, String password) {
        List<User> listOfUsers = userRepository.findAll();
        for (User user : listOfUsers) {
            if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
                return true;
            }
        }
        return false;
    }

    public User updateUser(Integer id, UserPojo userPojo) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setUsername(userPojo.getUser_name());
        user.setUser_email(userPojo.getUser_email());
        user.setPassword(userPojo.getPassword());
        user.setContact_number(userPojo.getContact_number());
        user.setUser_address(userPojo.getUser_address());
        return userRepository.save(user);
    }
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
    public User getUserById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }


}







