package com.example.flightmanagementsystem;

import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

@CucumberContextConfiguration
@SpringBootTest(classes = FlightManagementSystemApplication.class) // Replace with your main application class
public class CucumberSpringConfiguration {
}
