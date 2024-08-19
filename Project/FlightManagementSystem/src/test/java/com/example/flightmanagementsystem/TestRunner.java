package com.example.flightmanagementsystem;

import org.junit.runner.RunWith;
import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;

@RunWith(Cucumber.class)
@CucumberOptions(
        features = "src/test/resources/features",  // Path to feature files
        glue = "com.example.flightmanagementsystem.steps" // Package where step definitions are located
)
public class TestRunner {
}
