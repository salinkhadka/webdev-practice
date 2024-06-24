package com.example.flightmanagementsystem.Controller;

import com.example.flightmanagementsystem.Entity.User;
import com.example.flightmanagementsystem.Pojo.UserPojo;
import com.example.flightmanagementsystem.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

    @RestController
    @RequestMapping("/user")
    @RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/save")
    public void save(@RequestBody UserPojo userPojo){
        this.userService.saveData(userPojo);
    }

    @GetMapping("/get")
    public List<User> getAll() {
        return this.userService.getAll();
    }

    @PostMapping("/login")
    public boolean login(@RequestBody User request) {
        String username = request.getUsername();
        String password = request.getPassword();
        return userService.login(username, password);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody UserPojo userPojo) {
        return userService.updateUser(id, userPojo);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }
//    @GetMapping("/email")
//    public User getUserByEmail(@RequestParam String email) {
//        return userService.getUserByEmail(email);
//    }


}

