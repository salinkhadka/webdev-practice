package com.example.flightmanagementsystem.Controller;

import com.example.flightmanagementsystem.Entity.Flight;
import com.example.flightmanagementsystem.Pojo.FlightPojo;
import com.example.flightmanagementsystem.Service.FlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/flights")
public class FlightController {

    private final FlightService flightService;

    @GetMapping("/getAll")
    public List<Flight> getAllFlights() {
        return flightService.getAllFlights();
    }

    @GetMapping("/{id}")
    public Flight getFlightById(@PathVariable Integer id) {
        return flightService.getFlightById(id);
    }


    @PostMapping("/flightcreate")
    public ResponseEntity<Flight> createFlight(@RequestBody FlightPojo flightPojo) {
        Flight flight = flightService.createFlight(flightPojo);
        return new ResponseEntity<>(flight, HttpStatus.CREATED);
    }


    @PutMapping("update/{id}")
    public Flight updateFlight(@PathVariable Integer id, @RequestBody Flight flight) {
        return flightService.updateFlight(id, flight);
    }

    @DeleteMapping("remove/{id}")
    public void deleteFlight(@PathVariable Integer id) {
        flightService.deleteFlight(id);
    }
}
