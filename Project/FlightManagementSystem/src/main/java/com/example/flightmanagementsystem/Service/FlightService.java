package com.example.flightmanagementsystem.Service;

import com.example.flightmanagementsystem.Entity.Flight;

import java.util.List;

public interface FlightService {
    List<Flight> getAllFlights();

    Flight getFlightById(Integer id);


    Flight createFlight(Flight flight);

    Flight updateFlight(Integer id, Flight flight);

    void deleteFlight(Integer id);
}
