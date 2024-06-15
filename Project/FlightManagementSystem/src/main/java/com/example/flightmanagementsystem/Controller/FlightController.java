package com.example.flightmanagementsystem.Controller;

import com.example.flightmanagementsystem.Entity.Flight;
import com.example.flightmanagementsystem.Service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/flights")
public class FlightController {

    @Autowired
    private FlightService flightService;

    @GetMapping
    public List<Flight> getAllFlights() {
        return flightService.getAllFlights();
    }

    @GetMapping("/{id}")
    public Flight getFlightById(@PathVariable Integer id) {
        return flightService.getFlightById(id);
    }


    @PostMapping
    public Flight createFlight(@RequestBody Flight flight) {
        return flightService.createFlight(flight);
    }

    @PutMapping("/{id}")
    public Flight updateFlight(@PathVariable Integer id, @RequestBody Flight flight) {
        return flightService.updateFlight(id, flight);
    }

    @DeleteMapping("/{id}")
    public void deleteFlight(@PathVariable Integer id) {
        flightService.deleteFlight(id);
    }
}
