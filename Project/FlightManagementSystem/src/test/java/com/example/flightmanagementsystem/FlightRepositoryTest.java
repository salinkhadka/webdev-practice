package com.example.flightmanagementsystem;

import com.example.flightmanagementsystem.Entity.Flight;
import com.example.flightmanagementsystem.Repository.FlightRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class FlightRepositoryTest {

    @Autowired
    private FlightRepository flightRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveFlightTest() {
        Flight flight = new Flight();
        flight.setAirline("Delta Airlines");
        flight.setFlightNumber("DL123");
        flight.setDepartureTime(LocalDateTime.now().plusDays(1));
        flight.setArrivalTime(LocalDateTime.now().plusDays(1).plusHours(2));
        flight.setOrigin("New York");
        flight.setDestination("Los Angeles");
        flight.setPrice(300);

        flightRepository.save(flight);

        Assertions.assertThat(flight.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void getFlightTest() {
        Flight flight = flightRepository.findById(1).orElse(null);
        Assertions.assertThat(flight).isNotNull();
        Assertions.assertThat(flight.getId()).isEqualTo(1);
    }

    @Test
    @Order(3)
    public void getListOfFlightsTest() {
        List<Flight> flights = flightRepository.findAll();
        Assertions.assertThat(flights.size()).isGreaterThan(0);
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateFlightTest() {
        Flight flight = flightRepository.findById(1).orElse(null);
        if (flight != null) {
            flight.setAirline("United Airlines");
            flight.setPrice(350);

            Flight updatedFlight = flightRepository.save(flight);

            Assertions.assertThat(updatedFlight.getAirline()).isEqualTo("United Airlines");
            Assertions.assertThat(updatedFlight.getPrice()).isEqualTo(350);
        }
    }


}
