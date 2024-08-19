package com.example.flightmanagementsystem.Controller;

import com.example.flightmanagementsystem.Entity.User;
import com.example.flightmanagementsystem.Pojo.AuthPojo;
import com.example.flightmanagementsystem.Pojo.UserPojo;
import com.example.flightmanagementsystem.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
// @CrossOrigin(origins = "*")
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
    public Integer login(@RequestBody AuthPojo request) {
        String username = request.getUsername();
        String password = request.getPassword();
        return userService.login(username, password);
    }

    @PutMapping("update/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody UserPojo userPojo) {
        return userService.updateUser(id, userPojo);
    }

    @DeleteMapping("delete/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }

    @GetMapping("/get/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }

}
