package com.example.flightmanagementsystem;

import com.example.flightmanagementsystem.Entity.User;
import com.example.flightmanagementsystem.Repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveUserTest() {
        System.out.println("Running saveUserTest");
        User user = User.builder()
                .username("johndoe")
                .user_email("johndoe@example.com")
                .password("password123")
                .contact_number("1234567890")
                .user_address("123 Main St")
                .build();

        userRepository.save(user);

        Assertions.assertThat(user.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void getUserTest() {
        System.out.println("Running getUserTest");
        User userCreated = userRepository.findById(1).orElse(null);
        Assertions.assertThat(userCreated).isNotNull();
        Assertions.assertThat(userCreated.getId()).isEqualTo(1);
    }

    @Test
    @Order(3)
    public void getListOfUsersTest() {
        System.out.println("Running getListOfUsersTest");
        List<User> users = userRepository.findAll();
        Assertions.assertThat(users.size()).isGreaterThan(0);
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateUserTest() {
        System.out.println("Running updateUserTest");
        User user = userRepository.findById(1).orElse(null);
        if (user != null) {
            user.setUsername("janedoe");
            user.setPassword("newpassword123");

            User userUpdated = userRepository.save(user);

            Assertions.assertThat(userUpdated.getUsername()).isEqualTo("janedoe");
            Assertions.assertThat(userUpdated.getPassword()).isEqualTo("newpassword123");
        } else {
            System.out.println("User not found for update");
        }
    }

    @Test
    @Order(5)
    @Rollback(value = false)
    public void deleteUserTest() {
        System.out.println("Running deleteUserTest");
        User user = userRepository.findById(5).orElse(null);
        if (user != null) {
            userRepository.delete(user);

            Integer userId = userRepository.gtUserIDFromPwordANdUname("newpassword14523", "janedoe");
            Assertions.assertThat(userId).isNull();
        } else {
            System.out.println("User not found for deletion");
        }
    }
}
